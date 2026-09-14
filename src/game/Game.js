import { StateMachine } from '../core/StateMachine.js';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../core/Canvas.js';
import { InputState } from '../core/Input.js';
import { circleIntersect } from '../core/Collision.js';
import { createPlayer, updatePlayer, renderPlayer, damagePlayer } from '../entities/Player.js';
import { createBullet } from '../entities/Bullet.js';
import { damageEnemy } from '../entities/Enemy.js';
import { createEntityManager, updateAll, renderAll, pruneDead } from '../entities/EntityManager.js';
import { LEVELS } from '../levels/levelConfig.js';
import {
  createSpawnManager,
  resetSpawnManager,
  updateSpawning,
  levelFullyCleared,
} from '../levels/SpawnManager.js';
import { renderMenu, isPlayButtonClicked } from '../ui/MenuScreen.js';
import { renderHud } from '../ui/Hud.js';
import { renderLevelComplete, isNextButtonClicked } from '../ui/LevelCompleteScreen.js';
import { renderGameOver, isRetryButtonClicked } from '../ui/GameOverScreen.js';
import { renderWin, isPlayAgainButtonClicked } from '../ui/WinScreen.js';

const PLAYER_MARGIN = 24;
const MUZZLE_OFFSET = 32;

export function createGame() {
  const bounds = {
    minX: PLAYER_MARGIN,
    maxX: CANVAS_WIDTH - PLAYER_MARGIN,
    minY: PLAYER_MARGIN,
    maxY: CANVAS_HEIGHT - PLAYER_MARGIN,
  };

  const game = {
    player: createPlayer(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2),
    entityManager: createEntityManager(),
    spawner: createSpawnManager(),
    levelIndex: 0,
    totalLevels: LEVELS.length,
    currentLevel: LEVELS[0],
    score: 0,
    enemiesDefeated: 0,
  };

  function resetRun() {
    game.player = createPlayer(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    game.entityManager = createEntityManager();
    game.levelIndex = 0;
    game.currentLevel = LEVELS[0];
    game.score = 0;
    game.enemiesDefeated = 0;
    resetSpawnManager(game.spawner);
  }

  function startLevel(index) {
    game.levelIndex = index;
    game.currentLevel = LEVELS[index];
    game.enemiesDefeated = 0;
    game.entityManager = createEntityManager();
    resetSpawnManager(game.spawner);
  }

  function renderWorld(ctx) {
    ctx.fillStyle = '#161623';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    renderAll(game.entityManager, ctx);
    renderPlayer(ctx, game.player);
    renderHud(ctx, game);
  }

  const states = {
    MENU: {
      onRender(ctx) {
        renderMenu(ctx);
      },
      onClick(x, y) {
        if (isPlayButtonClicked(x, y)) {
          resetRun();
          machine.changeState('PLAYING');
        }
      },
    },

    PLAYING: {
      onUpdate(dt) {
        updatePlayer(game.player, dt, InputState, bounds);

        if (InputState.mouseClicked) {
          const angle = game.player.angle;
          const bullet = createBullet(
            game.player.x + Math.cos(angle) * MUZZLE_OFFSET,
            game.player.y + Math.sin(angle) * MUZZLE_OFFSET,
            angle,
          );
          game.entityManager.bullets.push(bullet);
          game.player.shootFlashTimer = 0.08;
        }

        updateAll(game.entityManager, dt, game.player);
        updateSpawning(
          game.spawner,
          dt,
          game.currentLevel,
          game.entityManager,
          CANVAS_WIDTH,
          CANVAS_HEIGHT,
        );

        for (const bullet of game.entityManager.bullets) {
          if (!bullet.alive) continue;
          for (const enemy of game.entityManager.enemies) {
            if (!enemy.alive || enemy.dying) continue;
            if (circleIntersect(bullet, enemy)) {
              bullet.alive = false;
              const died = damageEnemy(enemy, 1);
              if (died) {
                game.score += 100;
                game.enemiesDefeated += 1;
              }
              break;
            }
          }
        }

        for (const enemy of game.entityManager.enemies) {
          if (!enemy.alive || enemy.dying) continue;
          if (circleIntersect(enemy, game.player)) {
            damagePlayer(game.player, 1);
          }
        }

        pruneDead(game.entityManager);

        if (!game.player.alive) {
          machine.changeState('GAME_OVER');
          return;
        }

        if (levelFullyCleared(game.spawner, game.currentLevel, game.entityManager)) {
          if (game.levelIndex + 1 >= LEVELS.length) {
            machine.changeState('WIN');
          } else {
            machine.changeState('LEVEL_COMPLETE');
          }
        }
      },
      onRender(ctx) {
        renderWorld(ctx);
      },
    },

    LEVEL_COMPLETE: {
      onRender(ctx) {
        renderWorld(ctx);
        renderLevelComplete(ctx, game);
      },
      onClick(x, y) {
        if (isNextButtonClicked(x, y)) {
          startLevel(game.levelIndex + 1);
          machine.changeState('PLAYING');
        }
      },
    },

    GAME_OVER: {
      onRender(ctx) {
        renderWorld(ctx);
        renderGameOver(ctx, game);
      },
      onClick(x, y) {
        if (isRetryButtonClicked(x, y)) {
          resetRun();
          machine.changeState('PLAYING');
        }
      },
    },

    WIN: {
      onRender(ctx) {
        renderWorld(ctx);
        renderWin(ctx, game);
      },
      onClick(x, y) {
        if (isPlayAgainButtonClicked(x, y)) {
          resetRun();
          machine.changeState('PLAYING');
        }
      },
    },
  };

  const machine = new StateMachine(states, 'MENU');

  return {
    update(dt) {
      machine.update(dt);
      InputState.mouseClicked = false;
    },
    render(ctx) {
      machine.render(ctx);
    },
    handleClick(x, y) {
      machine.handleClick(x, y);
    },
  };
}
