from playwright.sync_api import sync_playwright
import os, json

out = r'C:\Users\totot\.gemini\antigravity\antigravity_projects\figma\screenshots'
os.makedirs(out, exist_ok=True)

routes = [
    '/login',
    '/register',
    '/home',
    '/routes',
    '/leaderboard',
    '/profile',
    '/settings',
    '/payment',
    '/admin',
    '/profile/history',
]

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 390, 'height': 844})
    
    for route in routes:
        try:
            page.goto(f'http://localhost:8081{route}', timeout=20000)
            page.wait_for_load_state('networkidle', timeout=15000)
            page.wait_for_timeout(3000)
            
            safe = route.replace('/', '_').lstrip('_') or 'index'
            path = os.path.join(out, f'{safe}.png')
            page.screenshot(path=path, full_page=False)
            
            # Also save the DOM for analysis
            html = page.content()
            with open(os.path.join(out, f'{safe}.html'), 'w', encoding='utf-8') as f:
                f.write(html)
            
            print(f'OK: {route}')
        except Exception as e:
            print(f'FAIL: {route} - {e}')
    
    browser.close()
print('All done')
