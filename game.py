import pygame
import random

pygame.init()

WIDTH, HEIGHT = 480, 640
FPS = 60
GRAVITY = 0.5
JUMP_FORCE = -12
MOVE_SPEED = 6

WHITE = (255, 255, 255)
PLAYER_COLOR = (100, 200, 255)
PLATFORM_COLOR = (80, 220, 140)
BG_COLOR = (20, 20, 35)

screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Jumping Game")
clock = pygame.time.Clock()
font = pygame.font.SysFont("Arial", 28, bold=True)


def main():
    px = WIDTH // 2 - 15
    py = HEIGHT - 90
    pw, ph = 30, 30
    vy = 0
    on_ground = False
    score = 0
    game_over = False

    platforms = []
    start_y = HEIGHT - 50
    platforms.append({"x": WIDTH // 2 - 35, "y": start_y, "w": 70, "h": 12})

    highest_y = start_y
    for _ in range(6):
        highest_y -= random.randint(55, 75)
        platforms.append({
            "x": random.randint(0, WIDTH - 70),
            "y": highest_y,
            "w": 70, "h": 12
        })

    running = True

    while running:
        clock.tick(FPS)

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            if event.type == pygame.KEYDOWN and event.key == pygame.K_SPACE:
                if game_over:
                    main()
                    return
                if on_ground:
                    vy = JUMP_FORCE

        if not game_over:
            keys = pygame.key.get_pressed()
            if keys[pygame.K_LEFT]:
                px -= MOVE_SPEED
            if keys[pygame.K_RIGHT]:
                px += MOVE_SPEED

            vy += GRAVITY
            py += vy

            if px + pw < 0:
                px = WIDTH
            if px > WIDTH:
                px = -pw

            on_ground = False

            if vy > 0 and py < HEIGHT // 2:
                shift = HEIGHT // 2 - py
                py = HEIGHT // 2
                for p in platforms:
                    p["y"] += shift
                platforms = [p for p in platforms if p["y"] <= HEIGHT]
                score += len([p for p in platforms if p["y"] > HEIGHT])
                highest_y -= shift
                while len(platforms) < 8:
                    highest_y -= random.randint(55, 75)
                    platforms.append({
                        "x": random.randint(0, WIDTH - 70),
                        "y": highest_y,
                        "w": 70, "h": 12
                    })

            for p in platforms:
                if (vy > 0 and
                    px + pw > p["x"] and px < p["x"] + p["w"] and
                    py + ph >= p["y"] and py + ph <= p["y"] + p["h"] + 8):
                    vy = 0
                    py = p["y"] - ph
                    on_ground = True

            if py > HEIGHT:
                game_over = True

        screen.fill(BG_COLOR)

        for p in platforms:
            pygame.draw.rect(screen, PLATFORM_COLOR, (p["x"], p["y"], p["w"], p["h"]), border_radius=6)

        pygame.draw.rect(screen, PLAYER_COLOR, (px, py, pw, ph), border_radius=6)

        score_text = font.render(f"Score: {score}", True, WHITE)
        screen.blit(score_text, (10, 10))

        if game_over:
            overlay = pygame.Surface((WIDTH, HEIGHT), pygame.SRCALPHA)
            overlay.fill((0, 0, 0, 150))
            screen.blit(overlay, (0, 0))
            go_text = font.render("Game Over!", True, WHITE)
            restart_text = font.render("Press SPACE to restart", True, WHITE)
            screen.blit(go_text, (WIDTH // 2 - go_text.get_width() // 2, HEIGHT // 2 - 30))
            screen.blit(restart_text, (WIDTH // 2 - restart_text.get_width() // 2, HEIGHT // 2 + 10))

        pygame.display.flip()

    pygame.quit()


if __name__ == "__main__":
    main()
