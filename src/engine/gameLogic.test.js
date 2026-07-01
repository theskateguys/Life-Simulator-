import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  applyAction,
  applyEventChoice,
  canUseAction,
  createInitialGame,
  endYear,
  findAction,
  refreshFinance,
  startNextGeneration
} from './gameLogic.js';

function fixtureGame(overrides = {}) {
  const base = createInitialGame({
    islandId:'trinidad',
    backgroundId:'wealthy',
    name:'Test Player',
    preference:'any'
  });
  return refreshFinance({
    ...base,
    ...overrides,
    stats:{...base.stats, ...(overrides.stats || {})},
    skills:{...base.skills, ...(overrides.skills || {})},
    finance:{...base.finance, ...(overrides.finance || {})},
    business:{...base.business, ...(overrides.business || {})},
    properties:overrides.properties || base.properties,
    children:overrides.children || base.children,
    yearLims:overrides.yearLims || base.yearLims,
    yearLog:overrides.yearLog || base.yearLog
  });
}

function action(id) {
  const found = findAction(id);
  if (!found) throw new Error(`Missing action fixture: ${id}`);
  return found;
}

describe('core game-engine regression rules', () => {
  beforeEach(() => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('enforces yearly action limits for saving and free Damian contact', () => {
    const save = action('save');
    const saved = applyAction(fixtureGame(), save).game;

    expect(saved.yearFocus).toBe(1);
    expect(saved.yearLims.save).toBe(1);
    expect(canUseAction(saved, save).ok).toBe(false);
    expect(applyAction(saved, save).error).toContain('Year limit reached');

    const damianContact = action('damian_contact');
    const beforeDamian = fixtureGame();
    const afterDamian = applyAction(beforeDamian, damianContact).game;

    expect(damianContact.cost).toBe(0);
    expect(afterDamian.yearFocus).toBe(beforeDamian.yearFocus);
    expect(afterDamian.yearLims.damian_contact).toBe(1);
    expect(canUseAction(afterDamian, damianContact).ok).toBe(false);
  });

  it('accounts for the business loan once without paying cash twice', () => {
    const game = fixtureGame({finance:{cash:25000, loanDebt:0}});
    const result = applyAction(game, action('loan')).game;

    expect(result.finance.cash - game.finance.cash).toBe(8000);
    expect(result.finance.loanDebt - game.finance.loanDebt).toBe(8000);
    expect(result.finance.cash - game.finance.cash).not.toBe(16000);
  });

  it('sells one property, clears its mortgage share, and blocks repeat selling', () => {
    const game = fixtureGame({finance:{cash:50000, mortgageDebt:0}});
    const bought = applyAction(game, action('buy_property')).game;
    const property = bought.properties[0];
    const mortgageBeforeSale = bought.finance.mortgageDebt;

    expect(bought.properties).toHaveLength(1);
    expect(property.mortgage).toBeGreaterThan(0);
    expect(mortgageBeforeSale).toBe(property.mortgage);

    const sold = applyAction({...bought, yearFocus:4}, action('sell_property')).game;

    expect(sold.properties).toHaveLength(0);
    expect(sold.finance.mortgageDebt).toBe(mortgageBeforeSale - property.mortgage);
    expect(canUseAction(sold, action('sell_property')).ok).toBe(false);
    expect(applyAction(sold, action('sell_property')).error).toBe('Own at least 1 property');
  });

  it('applies event fame payloads from legacy and changes fields', () => {
    const event = {id:'test_fame_event', title:'Fame Test', icon:'*', accent:'#fff'};
    const topLevelChoice = {label:'Legacy fame', result:'Legacy applied.', changes:{happiness:1}, fame:1200};
    const combinedChoice = {label:'Combined fame', result:'Combined applied.', changes:{fame:300}, fame:700};

    const topLevel = applyEventChoice(fixtureGame(), event, topLevelChoice);
    expect(topLevel.game.followers).toBe(1200);
    expect(topLevel.outcome.changes.fame).toBe(1200);

    const combined = applyEventChoice(fixtureGame(), event, combinedChoice);
    expect(combined.game.followers).toBe(1000);
    expect(combined.outcome.changes.fame).toBe(1000);
  });

  it('starts the next generation with the explicitly selected child', () => {
    const oldest = {id:'oldest', name:'Oldest Child', age:24, stats:{intelligence:40, wellbeing:70}};
    const selected = {id:'selected', name:'Selected Child', age:18, stats:{intelligence:88, wellbeing:70}};
    const game = fixtureGame({children:[oldest, selected], finance:{cash:20000, investments:5000}});

    const next = startNextGeneration(game, selected);

    expect(next.name).toBe(selected.name);
    expect(next.age).toBe(18);
    expect(next.stats.intelligence).toBe(88);
    expect(next.name).not.toBe(oldest.name);
  });

  it('returns a final end-of-year finance snapshot without mutating the input game', () => {
    const game = fixtureGame({
      career:'employee',
      finance:{cash:10000, investments:0, loanDebt:0, mortgageDebt:0},
      stats:{stress:20, health:80}
    });
    const before = structuredClone(game);
    const annualNet = Math.round((game.finance.monthlyIncome - game.finance.monthlyExpenses) * 12);

    const result = endYear(game);

    expect(result.game).not.toBe(game);
    expect(game).toEqual(before);
    expect(result.game.finance.cash).toBe(Math.max(0, before.finance.cash + annualNet));
  });
});
