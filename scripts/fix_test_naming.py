from pathlib import Path

config = Path('playwright.config.js')
text = config.read_text(encoding='utf-8')
text = text.replace("  testDir: './tests',\n", "  testDir: './tests',\n  testMatch: '**/*.e2e.js',\n", 1)
config.write_text(text, encoding='utf-8')

source = Path('tests/smoke.spec.js')
target = Path('tests/smoke.e2e.js')
source.replace(target)
