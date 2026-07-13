import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import { chromium } from '@playwright/test';

const baseURL = 'http://127.0.0.1:5173';
const server = spawn(
  process.execPath,
  ['node_modules/vite/bin/vite.js', '--host', '127.0.0.1', '--port', '5173', '--strictPort'],
  {cwd:process.cwd(), stdio:['ignore', 'pipe', 'pipe']}
);

let browser;

async function waitForServer() {
  const deadline = Date.now() + 30000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(baseURL);
      if (response.ok) return;
    } catch {
      await delay(250);
    }
  }
  throw new Error(`Vite server did not become ready at ${baseURL}`);
}

async function expectVisible(locator, label) {
  try {
    await locator.waitFor({state:'visible', timeout:5000});
  } catch (error) {
    throw new Error(`Expected visible: ${label}\n${error.message}`);
  }
}

async function runSmokeTest() {
  await waitForServer();

  browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(baseURL);
  await expectVisible(page.getByRole('heading', {name:'ISLAND LIFE'}), 'title heading');
  await page.getByRole('button', {name:/New Life/}).click();

  await expectVisible(page.getByRole('heading', {name:'This is your life story'}), 'intro heading');
  await page.getByRole('button', {name:/Build Wealth/}).click();
  await page.getByRole('button', {name:/Choose Island/}).click();

  await page.getByRole('button', {name:/Trinidad & Tobago/}).click();
  await page.getByRole('button', {name:/Working Class Family/}).click();
  await page.getByRole('textbox', {name:/Type your character's name/}).fill('Aaliyah Baptiste');
  await page.getByRole('button', {name:/Begin in Trinidad & Tobago/}).click();

  await expectVisible(page.getByRole('heading', {name:/Build Wealth in Motion/}), 'gameplay heading');
  await expectVisible(page.getByText('Your next move'), 'next move panel');
  await expectVisible(page.getByRole('button', {name:/CAREER/}).first(), 'career chapter');
  await expectVisible(page.getByRole('button', {name:'Save', exact:true}), 'save button');
}

try {
  await runSmokeTest();
  console.log('Playwright smoke test passed.');
} finally {
  if (browser) await browser.close();
  server.kill();
}
