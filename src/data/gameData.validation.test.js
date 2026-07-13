import { describe, expect, it } from 'vitest';
import {
  ACHIEVEMENTS, ACTION_CATEGORIES, BACKGROUNDS, BRAND_DEALS, BUSINESS_ACTIONS, CONTEXT_EVENTS,
  ISLANDS, PROPERTY_ACTIONS, RANDOM_LIFE_EVENTS, SKILLS
} from './gameData.js';

const allActions = [
  ...ACTION_CATEGORIES.flatMap(category => category.items),
  ...BUSINESS_ACTIONS,
  ...PROPERTY_ACTIONS
];

const allEvents = [
  ...CONTEXT_EVENTS,
  ...RANDOM_LIFE_EVENTS,
  ...ISLANDS.map(island => ({...island.unique, id:`${island.id}:unique`}))
];

function expectUniqueIds(items, label) {
  const ids = items.map(item => item.id);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  expect(duplicates, `${label} ids should be unique`).toEqual([]);
}

describe('game data validation', () => {
  it('keeps stable unique ids for content that saves or unlocks by id', () => {
    expectUniqueIds(ISLANDS, 'island');
    expectUniqueIds(BACKGROUNDS, 'background');
    expectUniqueIds(SKILLS, 'skill');
    expectUniqueIds(ACHIEVEMENTS, 'achievement');
    expectUniqueIds(BRAND_DEALS, 'brand deal');
    expectUniqueIds(ACTION_CATEGORIES, 'action category');
    expectUniqueIds(allActions, 'action');
    expectUniqueIds(allEvents, 'event');
  });

  it('keeps island economy fields complete and numeric', () => {
    for (const island of ISLANDS) {
      expect(island.name).toBeTruthy();
      expect(island.currency).toBeTruthy();
      expect(island.monthlyEssentials).toBeGreaterThan(0);
      expect(island.propertyPrice).toBeGreaterThan(0);
      expect(island.rentalIncome).toBeGreaterThanOrEqual(0);
      expect(island.stormRisk).toBeGreaterThanOrEqual(0);
      expect(island.stormRisk).toBeLessThanOrEqual(1);
      expect(island.unique?.choices?.length).toBeGreaterThan(0);
    }
  });

  it('uses the cash change key for financial action and event payloads', () => {
    const actionChanges = allActions.flatMap(action => Object.keys(action.changes || {}));
    const eventChanges = allEvents.flatMap(event => event.choices.flatMap(choice => Object.keys(choice.changes || {})));

    expect(actionChanges).not.toContain('money');
    expect(eventChanges).not.toContain('money');
  });

  it('keeps player-facing choices usable', () => {
    for (const action of allActions) {
      expect(action.label).toBeTruthy();
      expect(action.desc).toBeTruthy();
      expect(Number.isInteger(action.cost)).toBe(true);
      expect(action.cost).toBeGreaterThanOrEqual(0);
    }

    for (const event of allEvents) {
      expect(event.title).toBeTruthy();
      expect(event.story).toBeTruthy();
      expect(event.choices.length).toBeGreaterThan(0);
      for (const choice of event.choices) {
        expect(choice.label).toBeTruthy();
        expect(choice.result).toBeTruthy();
      }
    }
  });
});
