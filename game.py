import pygame
import random
import math

pygame.init()

WIDTH, HEIGHT = 480, 640
FPS = 60
GRAVITY = 0.5
JUMP_FORCE = -12
MOVE_SPEED = 6
PW, PH = 30, 30  # player size
PLAT_W, PLAT_H = 70, 12

# Physics-derived limits (verified: max jump height ~138px, horiz reach ~288px)
MAX_VERT_GAP = 105   # safe vertical gap between platforms (< 138px max jump)
MIN_VERT_GAP = 45    # minimum gap so platforms aren't too cramped

WHITE = (255, 255, 255)
GRAY = (160, 160, 160)
PLAYER_COLOR = (100, 200, 255)
PLATFORM_COLOR = (80, 220, 140)
BG_COLOR = (20, 20, 35)

screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Jumping Game")
clock = pygame.time.Clock()
font = pygame.font.SysFont("Arial", 28, bold=True)
font_small = pygame.font.SysFont("Arial", 20)


# Path shape generators — each returns a dx offset relative to previous platform x
# All are guaranteed reachable because horizontal wrap makes any x accessible
# as long as vertical gap <= MAX_VERT_GAP

def shape_straight():
    """Go roughly straight up — small horizontal drift."""
    return random.randint(-60, 60)

def shape_zigzag(step):
    """Alternate left and right."""
    direction = 1 if step % 2 == 0 else -1
    return direction * random.randint(80, 150)

def shape_u_curve(step, total=4):
    """Go wide left then come back right (U-shape over several platforms)."""
    if step < total // 2:
        return random.randint(90, 140)   # go right
    else:
        return random.randint(-140, -90)  # come back left

def shape_drift():
    """Slow continuous drift in one direction."""
    return random.choice([-1, 1]) * random.randint(30, 80)


SHAPE_SEQUENCES = [
    # (shape_fn, num_platforms_in_sequence)
    "straight",
    "zigzag",
    "u_curve",
    "drift",
]


class PlatformGenerator:
    """Generates platforms with guaranteed reachability and varied path shapes."""

    def __init__(self, start_x, start_y):
        self.prev_x = start_x
        self.prev_y = start_y
        self.shape = "straight"
        self.shape_step = 0
        self.shape_remaining = random.randint(3, 6)

    def _pick_new_shape(self):
        self.shape = random.choice(SHAPE_SEQUENCES)
        self.shape_remaining = random.randint(3, 6)
        self.shape_step = 0

    def next(self):
        """Generate the next platform, guaranteed reachable from the previous one."""

        # Vertical gap: random within safe range
        dy = random.randint(MIN_VERT_GAP, MAX_VERT_GAP)
        new_y = self.prev_y - dy

        # Horizontal offset based on current shape
        if self.shape == "straight":
            dx = shape_straight()
        elif self.shape == "zigzag":
            dx = shape_zigzag(self.shape_step)
        elif self.shape == "u_curve":
            dx = shape_u_curve(self.shape_step, self.shape_remaining)
        else:  # drift
            dx = shape_drift()

        new_x = self.prev_x + dx

        # Clamp x so platform stays on screen (with wrap awareness)
        new_x = new_x % (WIDTH - PLAT_W)
        new_x = max(0, min(WIDTH - PLAT_W, new_x))

        self.prev_x = new_x
        self.prev_y = new_y

        self.shape_step += 1
        self.shape_remaining -= 1
        if self.shape_remaining <= 0:
            self._pick_new_shape()

        return {"x": new_x, "y": new_y, "w": PLAT_W, "h": PLAT_H}


def reset_game():
    px = WIDTH // 2 - PW // 2
    py = HEIGHT - 90
    vy = 0
    on_ground = False
    score = 0
    game_over = False

    start_x = WIDTH // 2 - PLAT_W // 2
    start_y = HEIGHT - 50
    platforms = [{"x": start_x, "y": start_y, "w": PLAT_W, "h": PLAT_H}]

    gen = PlatformGenerator(start_x, start_y)
    for _ in range(9):
        platforms.append(gen.next())

    return px, py, vy, on_ground, score, game_over, platforms, gen


def main():
    px, py, vy, on_ground, score, game_over, platforms, gen = reset_game()

    running = True
    while running:
        clock.tick(FPS)

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_SPACE:
                    if game_over:
                        px, py, vy, on_ground, score, game_over, platforms, gen = reset_game()
                    elif on_ground:
                        vy = JUMP_FORCE
                elif event.key == pygame.K_r:
                    px, py, vy, on_ground, score, game_over, platforms, gen = reset_game()

        if not game_over:
            keys = pygame.key.get_pressed()
            if keys[pygame.K_LEFT]:
                px -= MOVE_SPEED
            if keys[pygame.K_RIGHT]:
                px += MOVE_SPEED

            vy += GRAVITY
            py += vy

            # Horizontal screen wrap
            if px + PW < 0:
                px = WIDTH
            if px > WIDTH:
                px = -PW

            on_ground = False

            # Scroll camera up when player reaches upper half
            if vy < 0 and py < HEIGHT // 2:
                shift = HEIGHT // 2 - py
                py = HEIGHT // 2
                for p in platforms:
                    p["y"] += shift
                gen.prev_y += shift  # keep generator in sync with world

                # Remove platforms that scrolled off the bottom, count as scored
                before = len(platforms)
                platforms = [p for p in platforms if p["y"] <= HEIGHT + 20]
                score += before - len(platforms)

                # Refill platforms ahead
                while len(platforms) < 10:
                    platforms.append(gen.next())

            # Platform collision (only when falling down)
            for p in platforms:
                if (vy > 0 and
                        px + PW > p["x"] and px < p["x"] + p["w"] and
                        py + PH >= p["y"] and py + PH <= p["y"] + p["h"] + 10):
                    vy = 0
                    py = p["y"] - PH
                    on_ground = True

            # Fall off bottom = game over
            if py > HEIGHT:
                game_over = True

        # --- Draw ---
        screen.fill(BG_COLOR)

        for p in platforms:
            pygame.draw.rect(screen, PLATFORM_COLOR,
                             (p["x"], p["y"], p["w"], p["h"]), border_radius=6)

        pygame.draw.rect(screen, PLAYER_COLOR, (px, py, PW, PH), border_radius=6)

        score_text = font.render(f"Score: {score}", True, WHITE)
        screen.blit(score_text, (10, 10))

        hint = font_small.render("R = restart", True, GRAY)
        screen.blit(hint, (WIDTH - hint.get_width() - 10, 10))

        if game_over:
            overlay = pygame.Surface((WIDTH, HEIGHT), pygame.SRCALPHA)
            overlay.fill((0, 0, 0, 160))
            screen.blit(overlay, (0, 0))
            go_text = font.render("Game Over!", True, WHITE)
            score_final = font.render(f"Score: {score}", True, WHITE)
            restart_text = font_small.render("Press SPACE or R to restart", True, GRAY)
            screen.blit(go_text, (WIDTH // 2 - go_text.get_width() // 2, HEIGHT // 2 - 50))
            screen.blit(score_final, (WIDTH // 2 - score_final.get_width() // 2, HEIGHT // 2 - 10))
            screen.blit(restart_text, (WIDTH // 2 - restart_text.get_width() // 2, HEIGHT // 2 + 30))

        pygame.display.flip()

    pygame.quit()


if __name__ == "__main__":
    main()
