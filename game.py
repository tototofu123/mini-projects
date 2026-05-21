import pygame
import random

pygame.init()

WIDTH, HEIGHT = 480, 640
FPS = 60
GRAVITY = 0.5
JUMP_FORCE = -12
MOVE_SPEED = 6

WHITE = (255, 255, 255)
BLACK = (20, 20, 30)
PLAYER_COLOR = (100, 200, 255)
PLATFORM_COLOR = (80, 220, 140)
BG_COLOR = (20, 20, 35)

screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Jumping Game")
clock = pygame.time.Clock()
font = pygame.font.SysFont("Arial", 28, bold=True)


class Player(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.Surface((30, 30))
        self.image.fill(PLAYER_COLOR)
        self.rect = self.image.get_rect()
        self.rect.centerx = WIDTH // 2
        self.rect.bottom = HEIGHT - 50
        self.vel_y = 0
        self.score = 0

    def update(self):
        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT] or keys[pygame.K_a]:
            self.rect.x -= MOVE_SPEED
        if keys[pygame.K_RIGHT] or keys[pygame.K_d]:
            self.rect.x += MOVE_SPEED

        self.vel_y += GRAVITY
        self.rect.y += self.vel_y

        if self.rect.right < 0:
            self.rect.left = WIDTH
        if self.rect.left > WIDTH:
            self.rect.right = 0


class Platform(pygame.sprite.Sprite):
    def __init__(self, x, y):
        super().__init__()
        self.image = pygame.Surface((70, 12))
        self.image.fill(PLATFORM_COLOR)
        self.rect = self.image.get_rect()
        self.rect.x = x
        self.rect.y = y


def generate_platforms(platforms, player):
    while len(platforms) < 8:
        x = random.randint(0, WIDTH - 70)
        y = random.randint(-60, -10)
        platforms.add(Platform(x, y))


def main():
    player = Player()
    all_sprites = pygame.sprite.Group(player)
    platforms = pygame.sprite.Group()

    for _ in range(7):
        x = random.randint(0, WIDTH - 70)
        y = random.randint(80, HEIGHT - 40)
        p = Platform(x, y)
        platforms.add(p)
        all_sprites.add(p)

    running = True
    game_over = False
    max_height = 0

    while running:
        clock.tick(FPS)

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            if event.type == pygame.KEYDOWN and event.key == pygame.K_SPACE and game_over:
                main()
                return

        if not game_over:
            all_sprites.update()

            if player.vel_y > 0 and player.rect.y < HEIGHT // 2:
                shift = HEIGHT // 2 - player.rect.y
                player.rect.y = HEIGHT // 2
                for p in platforms:
                    p.rect.y += shift
                    if p.rect.y > HEIGHT:
                        p.kill()
                        player.score += 10
                max_height += shift
                generate_platforms(platforms, player)

            for p in platforms:
                if player.vel_y > 0 and player.rect.colliderect(p.rect):
                    player.vel_y = JUMP_FORCE

            if player.rect.top > HEIGHT:
                game_over = True

        all_sprites.draw(screen)

        score_text = font.render(f"Score: {player.score}", True, WHITE)
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
