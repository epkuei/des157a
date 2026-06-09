/* =============================================
   COPY CAT — script.js
   ============================================= */

(function () {
  'use strict';

  var ROWS = 3;
  var COLS = 3;

  var DOT_LAYOUTS = {
    1: [[40, 40]],
    2: [[22, 22], [58, 58]],
    3: [[22, 22], [40, 40], [58, 58]],
    4: [[22, 22], [58, 22], [22, 58], [58, 58]],
    5: [[22, 22], [58, 22], [40, 40], [22, 58], [58, 58]],
    6: [[22, 20], [58, 20], [22, 40], [58, 40], [22, 60], [58, 60]]
  };

  var CAT_FACES = ['', '🐟', '🐠', '🐡', '🌸', '⭐', '🎀'];

  var p1Board, p2Board, currentDie, currentTurn, isGameOver, gameMode;

  /* ---- DICE DRAWING ---- */

  function drawDice(svgEl, value, color) {
    svgEl.innerHTML = '';
    var ns = 'http://www.w3.org/2000/svg';

    var rect = document.createElementNS(ns, 'rect');
    rect.setAttribute('x', '2');
    rect.setAttribute('y', '2');
    rect.setAttribute('width', '76');
    rect.setAttribute('height', '76');
    rect.setAttribute('rx', '14');
    rect.setAttribute('ry', '14');
    rect.setAttribute('fill', '#ffffff');
    rect.setAttribute('stroke', color || '#e07898');
    rect.setAttribute('stroke-width', '3');
    svgEl.appendChild(rect);

    if (!value) return;

    var dots = DOT_LAYOUTS[value];
    dots.forEach(function (pos) {
      var circle = document.createElementNS(ns, 'circle');
      circle.setAttribute('cx', pos[0]);
      circle.setAttribute('cy', pos[1]);
      circle.setAttribute('r', '7');
      circle.setAttribute('fill', color || '#e07898');
      svgEl.appendChild(circle);
    });
  }

  function makeCellDie(value, isP2) {
    var ns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 80 80');
    svg.setAttribute('xmlns', ns);

    var color = isP2 ? '#c99c20' : '#e07898';

    var rect = document.createElementNS(ns, 'rect');
    rect.setAttribute('x', '3');
    rect.setAttribute('y', '3');
    rect.setAttribute('width', '74');
    rect.setAttribute('height', '74');
    rect.setAttribute('rx', '12');
    rect.setAttribute('ry', '12');
    rect.setAttribute('fill', isP2 ? '#fffbf0' : '#fff0f5');
    rect.setAttribute('stroke', color);
    rect.setAttribute('stroke-width', '4');
    svg.appendChild(rect);

    var dots = DOT_LAYOUTS[value];
    dots.forEach(function (pos) {
      var circle = document.createElementNS(ns, 'circle');
      circle.setAttribute('cx', pos[0]);
      circle.setAttribute('cy', pos[1]);
      circle.setAttribute('r', '7');
      circle.setAttribute('fill', color);
      svg.appendChild(circle);
    });

    return svg;
  }

  /* ---- SETUP / NAVIGATION ---- */

  function init() {
    document.getElementById('mode-2p').addEventListener('click', function () {
      startGame('2p');
    });
    document.getElementById('mode-cpu').addEventListener('click', function () {
      startGame('cpu');
    });
    document.getElementById('btn-back').addEventListener('click', goBack);
    document.getElementById('btn-roll').addEventListener('click', rollDice);
    document.getElementById('btn-new').addEventListener('click', resetGame);
  }

  function goBack() {
    document.getElementById('game-ui').style.display = 'none';
    document.getElementById('mode-select').style.display = '';
  }

  function startGame(mode) {
    gameMode = mode;
    document.getElementById('mode-select').style.display = 'none';
    document.getElementById('game-ui').style.display = '';

    if (mode === 'cpu') {
      document.getElementById('label-p1').textContent     = '🐱 You';
      document.getElementById('label-p2').textContent     = '😼 Alayna';
      document.getElementById('boardname-p1').textContent = 'Your Board';
      document.getElementById('boardname-p2').textContent = "Alayna's Board";
      document.getElementById('icon-p2').textContent      = '😼';
    } else {
      document.getElementById('label-p1').textContent     = '🐱 Player 1';
      document.getElementById('label-p2').textContent     = '🐱 Player 2';
      document.getElementById('boardname-p1').textContent = 'Player 1';
      document.getElementById('boardname-p2').textContent = 'Player 2';
      document.getElementById('icon-p2').textContent      = '🐱';
    }

    resetGame();
  }

  function resetGame() {
    p1Board     = [[], [], []];
    p2Board     = [[], [], []];
    currentDie  = null;
    currentTurn = 'p1';
    isGameOver  = false;

    document.getElementById('gameover-area').innerHTML = '';
    document.getElementById('btn-roll').disabled = false;

    drawDice(document.getElementById('die-svg'), 0);

    renderAll(false);
    setStatus((gameMode === 'cpu' ? 'Your turn' : "Player 1's turn") + ' — roll the dice!');
    setActive('p1');
  }

  /* ---- GAME FLOW ---- */

  function rollDice() {
    if (isGameOver) return;

    var dieWrap = document.getElementById('die-svg').parentElement;
    dieWrap.classList.remove('rolling');
    void dieWrap.offsetWidth;
    dieWrap.classList.add('rolling');

    var ticks    = 0;
    var maxTicks = 10;
    var interval = setInterval(function () {
      var temp = Math.ceil(Math.random() * 6);
      drawDice(document.getElementById('die-svg'), temp);
      ticks++;
      if (ticks >= maxTicks) {
        clearInterval(interval);
        currentDie = Math.ceil(Math.random() * 6);
        drawDice(document.getElementById('die-svg'), currentDie);
        afterRoll();
      }
    }, 60);

    document.getElementById('btn-roll').disabled = true;
  }

  function afterRoll() {
    var isHumanTurn = currentTurn === 'p1' || (gameMode === '2p' && currentTurn === 'p2');

    if (isHumanTurn) {
      setStatus(getTurnName() + ' — place your ' + currentDie + ' (' + CAT_FACES[currentDie] + ')');
      renderAll(true);
    } else {
      setStatus('Alayna is thinking... 😼');
      setTimeout(alaynaPlay, 900);
    }
  }

  function getTurnName() {
    if (gameMode === 'cpu') return currentTurn === 'p1' ? 'Your turn' : "Alayna's turn";
    return currentTurn === 'p1' ? "Player 1's turn" : "Player 2's turn";
  }

  /* ---- ALAYNA (CPU) ---- */

  function alaynaPlay() {
    var available = [];
    for (var c = 0; c < COLS; c++) {
      if (p2Board[c].length < ROWS) available.push(c);
    }
    placeDie('p2', alaynaPickCol(available));
  }

  function alaynaPickCol(available) {
    var best      = available[0];
    var bestScore = -Infinity;

    for (var i = 0; i < available.length; i++) {
      var c      = available[i];
      var gain   = simGain(p2Board[c], currentDie);
      var cancel = 0;
      for (var r = 0; r < p1Board[c].length; r++) {
        if (p1Board[c][r] === currentDie) cancel += currentDie;
      }
      var s = gain + cancel * 0.9;
      if (s > bestScore) { bestScore = s; best = c; }
    }
    return best;
  }

  function simGain(col, val) {
    return colScore(col.concat([val])) - colScore(col);
  }

  /* ---- CORE MECHANICS ---- */

  function placeDie(who, colIdx) {
    var board      = who === 'p1' ? p1Board : p2Board;
    var otherBoard = who === 'p1' ? p2Board : p1Board;

    board[colIdx].push(currentDie);
    otherBoard[colIdx] = otherBoard[colIdx].filter(function (d) {
      return d !== currentDie;
    });

    renderAll(false);
    updateScores();

    if (checkGameOver()) {
      isGameOver = true;
      showGameOver();
      return;
    }

    currentTurn = who === 'p1' ? 'p2' : 'p1';

    if (gameMode === 'cpu' && currentTurn === 'p2') {
      setActive('p2');
      setTimeout(rollDice, 600);
    } else {
      document.getElementById('btn-roll').disabled = false;
      setStatus(getTurnName() + ' — roll the dice!');
      setActive(currentTurn);
    }
  }

  function checkGameOver() {
    var p1Full = p1Board.every(function (c) { return c.length === ROWS; });
    var p2Full = p2Board.every(function (c) { return c.length === ROWS; });
    return p1Full || p2Full;
  }

  function showGameOver() {
    var s1 = totalScore(p1Board);
    var s2 = totalScore(p2Board);
    var msg;

    if (gameMode === 'cpu') {
      if      (s1 > s2) { msg = '🎉 Purrfect! You win!'; }
      else if (s2 > s1) { msg = '😼 Alayna wins this time...'; }
      else               { msg = "🐾 It's a tie!"; }
    } else {
      if      (s1 > s2) { msg = '🎉 Player 1 wins!'; }
      else if (s2 > s1) { msg = '🎉 Player 2 wins!'; }
      else               { msg = "🐾 It's a tie!"; }
    }

    var n1 = gameMode === 'cpu' ? 'You'    : 'Player 1';
    var n2 = gameMode === 'cpu' ? 'Alayna' : 'Player 2';

    document.getElementById('btn-roll').disabled = true;
    document.getElementById('gameover-area').innerHTML =
      '<div class="game-over">' +
        '<div class="winner-text">' + msg + '</div>' +
        '<div class="final-scores">Final — ' + n1 + ': ' + s1 + ' pts  |  ' + n2 + ': ' + s2 + ' pts</div>' +
      '</div>';

    setStatus('Game over! 🐾');
  }

  /* ---- SCORING ---- */

  function colScore(col) {
    var counts = {};
    for (var i = 0; i < col.length; i++) {
      counts[col[i]] = (counts[col[i]] || 0) + 1;
    }
    var s = 0;
    for (var v in counts) {
      s += parseInt(v) * counts[v] * counts[v];
    }
    return s;
  }

  function totalScore(board) {
    return board.reduce(function (sum, col) {
      return sum + colScore(col);
    }, 0);
  }

  function updateScores() {
    document.getElementById('score-p1').textContent = totalScore(p1Board);
    document.getElementById('score-p2').textContent = totalScore(p2Board);
  }

  /* ---- RENDERING ---- */

  function renderAll(clickable) {
    renderGrid('p1', p1Board, clickable && currentTurn === 'p1');
    renderGrid('p2', p2Board, clickable && currentTurn === 'p2' && gameMode === '2p');
    updateScores();
  }

  function renderGrid(who, board, clickable) {
    var grid = document.getElementById('grid-' + who);
    var isP2 = who === 'p2';
    grid.innerHTML = '';

    for (var c = 0; c < COLS; c++) {
      var colWrap  = document.createElement('div');
      colWrap.className = 'col-wrap';

      var colCells = document.createElement('div');
      colCells.className = 'col-cells';

      var colClickable = clickable && board[c].length < ROWS;

      for (var r = ROWS - 1; r >= 0; r--) {
        var cell = document.createElement('div');
        var val  = board[c][r];

        if (val !== undefined) {
          cell.className = 'cell placed';
          cell.appendChild(makeCellDie(val, isP2));
          cell.title = 'Worth ' + val + ' pts';
        } else if (colClickable) {
          cell.className = 'cell clickable';
          cell.title = 'Place your ' + currentDie + ' here';
          (function (cc, w) {
            cell.addEventListener('click', function () { placeDie(w, cc); });
          })(c, who);
        } else {
          cell.className = 'cell';
        }

        colCells.appendChild(cell);
      }

      var colScoreEl = document.createElement('div');
      colScoreEl.className = 'col-score';
      var cs = colScore(board[c]);
      colScoreEl.textContent = cs > 0 ? cs : '';

      colWrap.appendChild(colCells);
      colWrap.appendChild(colScoreEl);
      grid.appendChild(colWrap);
    }
  }

  /* ---- HELPERS ---- */

  function setStatus(msg) {
    document.getElementById('status').textContent = msg;
  }

  function setActive(who) {
    document.getElementById('pill-p1').classList.toggle('active', who === 'p1');
    document.getElementById('pill-p2').classList.toggle('active', who === 'p2');
  }

  /* ---- KICK OFF ---- */

  init();

})();