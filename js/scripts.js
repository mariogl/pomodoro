const duracionTrabajo = 25;
const duracionDescanso = 5;
const duracionDescansoLargo = 20;
const periodoDescansoLargo = 4;

class Pomodoro {
  constructor() {
    this.inicializaProps();
    this.inicializaHtml();
    this.inicializaListeners();
    this.renderizaCronometro();
    this.tomateElem.classList.add('on');
    this.preconmutaEstado();
  }

  inicializaProps() {
    this.claseVisible = 'on';
    this.corriendo = false;
    this.estado = {
      trabajo: false,
      descanso: true
    }
    this.contador;
    this.nDescansos = 0;
    this.segundos = 0;
    this.minutos = duracionTrabajo;
  }

  inicializaHtml() {
    this.alarma = document.querySelector('.alarma');
    this.minutosElem = document.querySelector('.crono.minutos');
    this.segundosElem = document.querySelector('.crono.segundos');
    this.tomateElem = document.querySelector('.tomate');
    this.accionElem = document.querySelector('.accion');
    this.muteElem = document.querySelector('.mute');
  }

  inicializaListeners() {
    this.tomateElem.addEventListener('click', () => {
      this.ocultaTomate();
      this.desactivaAlarma();
      this.conmutaEstado();
    });
    this.muteElem.addEventListener('click', () => {
      this.desactivaAlarma();
    });
    this.alarma.addEventListener('ended', () => {
      this.ocultaMute();
    });
  }

  ocultaTomate() {
    this.tomateElem.classList.remove(this.claseVisible);
  }

  muestraTomate() {
    this.tomateElem.classList.add(this.claseVisible);
  }

  ocultaMute() {
    this.muteElem.classList.remove(this.claseVisible);
  }

  muestraMute() {
    this.tomateElem.classList.remove(this.claseVisible);
  }

  renderizaAccion() {
    this.accionElem.textContent = this.estado.trabajo ? 'trabaja' : 'descansa';
    if (this.estado.descanso) {
      this.accionElem.textContent += ` (#${this.nDescansos})`;
    }
  }

  ocultaAccion() {
    this.accionElem.textContent = '';
  }

  preconmutaEstado() {
    this.estado.descanso = !this.estado.descanso;
    this.estado.trabajo = !this.estado.trabajo;
    let minutos;
    if (this.estado.descanso) {
      this.nDescansos++;
      if (this.nDescansos === periodoDescansoLargo) {
        minutos = duracionDescansoLargo;
      } else {
        minutos = duracionDescanso;
        if (this.nDescansos > periodoDescansoLargo) {
          this.nDescansos = 1;
        }
      }
    } else {
      minutos = duracionTrabajo;
    }
    this.minutos = minutos;
    this.segundos = 0;
    this.renderizaCronometro();
    this.accionElem.textContent = '';
  }

  conmutaEstado() {
    this.renderizaAccion();
    this.iniciaCuentaAtras();
  }

  iniciaCuentaAtras() {
    this.corriendo = true;
    this.contador = setInterval(() => {
      this.pasoCuentaAtras();
    }, 20);
  }

  pasoCuentaAtras() {
    this.segundos--;
    if (this.segundos < 0) {
      this.minutos--;
      if (this.minutos < 0) {
        return this.acabaCuentaAtras();
      }
      this.segundos = 59;
    }
    this.renderizaCronometro();
  }

  activaAlarma() {
    this.alarma.play();
    this.muestraMute();
  }

  desactivaAlarma() {
    this.alarma.pause();
    this.alarma.currentTime = 0;
    this.ocultaMute();
  }

  acabaCuentaAtras() {
    clearInterval(this.contador);
    this.activaAlarma();
    this.muestraTomate();
    this.preconmutaEstado();
  }

  renderizaCronometro() {
    this.minutosElem.textContent = ('' + this.minutos).padStart(2, '0');
    this.segundosElem.textContent = ('' + this.segundos).padStart(2, '0');
  }
}

class SW {
  constructor() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js');
      });
    }
  }
}

new Pomodoro();
new SW();
