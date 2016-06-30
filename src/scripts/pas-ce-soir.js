class PasCeSoir {
  constructor() {
    this.pasCeSoir = {
      path: 'assets/pas-ce-soir.mp3',
      node: document.querySelector('.action--pas-ce-soir'),
      buffer: null,
    };
    this.pasMaintenant = {
      path: 'assets/pas-maintenant.mp3',
      node: document.querySelector('.action--pas-maintenant'),
      buffer: null,
    };
    this.pasAujourdhui = {
      path: 'assets/pas-aujourdhui.mp3',
      node: document.querySelector('.action--pas-aujourdhui'),
      buffer: null,
    };
    this.touchePas = {
      path: 'assets/touche-pas.mp3',
      node: document.querySelector('.action--touche-pas'),
      buffer: null,
    };
    this.actions = [
      this.pasCeSoir,
      this.pasMaintenant,
      this.pasAujourdhui,
      this.touchePas
    ];

    this.initContext();
    this.loadBuffers();
    this.addEventListeners();
  }

  addEventListeners() {
    this.actions.forEach(action => {
      action.node.addEventListener('click', (evt) => {
        evt.preventDefault();
        this.playAction(action);
      });
    });
  }

  initContext() {
    try {
      // Fix up for prefixing
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      this.context = new AudioContext();
    } catch (e) {
      console.log('Web Audio API is not supported in this browser', e);
    }
  }

  loadBuffer(action) {
    fetch(action.path)
      .then(resp => resp.arrayBuffer())
      .then(rawBuffer => this.context.decodeAudioData(rawBuffer))
      .then(buffer => action.buffer = buffer)
      .catch(err => {
        console.log('could not load buffer ', err, action);
      })
  }

  loadBuffers() {
    if (!this.context) return;

    this.actions.forEach(action => this.loadBuffer(action));
  }

  playAction(action) {
    if (!this.context) return;
    if (!action.buffer) return;

    action.node.classList.add('playing');
    try {
      const source = this.context.createBufferSource();
      source.buffer = action.buffer;
      source.connect(this.context.destination);
      source.addEventListener('ended', () => {
        action.node.classList.remove('playing');
      });
      source.start(0);
    } catch (e) {
      console.log('something screwed trying playing sound', e);
      action.node.classList.remove('playing');
    }
  }
}
try {
  new PasCeSoir();
} catch (err) {
  console.log('failed', err);
  document.body.innerHTML = "Need ES6, mate!";
}
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(error => {
    console.log('could not register the service worker', error);
  });
}
