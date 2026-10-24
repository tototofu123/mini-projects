from playwright.sync_api import sync_playwright
import os

out = r'C:\Users\totot\.gemini\antigravity\antigravity_projects\figma\screenshots'
os.makedirs(out, exist_ok=True)

routes = [
    '/',
    '/login',
    '/register',
    '/home',
    '/routes',
    '/leaderboard',
    '/profile',
    '/admin',
    '/settings',
    '/payment',
    '/profile/history',
]

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 390, 'height': 844})
    
    for route in routes:
        try:
            page.goto(f'http://localhost:8081{route}', timeout=15000)
            page.wait_for_load_state('networkidle', timeout=10000)
            page.wait_for_timeout(2000)
            safe = route.replace('/', '_') or 'index'
            page.screenshot(path=os.path.join(out, f'{safe}.png'), full_page=True)
            print(f'OK: {route}')
        except Exception as e:
            print(f'FAIL: {route} - {e}')
    
    browser.close()
print('Done')
