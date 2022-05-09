import keys from './modules/keys';
import createElement from './modules/dom';

import '../scss/style.scss';

document.addEventListener('DOMContentLoaded', () => {
    class Keyboard {
        constructor() {
            this.keys = {
                ru: keys.ru,
                en: keys.en,
            };
            this.keyboard = null;
            this.textarea = null;
            this.wrapper = null;
            this.ls = window.localStorage;
            this.lang = this.getLang();
            this.isShift = false;
            this.isShiftPush = false;
            this.isCapsLock = false;
            this.fKeys = ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'];
        }

        setLang(language) {
            this.ls.setItem('keyboard-lang', language);
        }

        getLang() {
            if (this.ls.getItem('keyboard-lang')) {
                return this.ls.getItem('keyboard-lang');
            }
            return 'ru';
        }

        renderShiftCapslockButtons(bool = false) {
            const capslockBtns = this.keys[this.lang].flat();
            const isShiftTrue = this.isShift || bool;

            capslockBtns.forEach((btn) => {
                if (btn.capsLockKey || btn.shiftKey) {
                    this.wrapper.querySelector(`[data-key=${btn.keyCode}]`).innerHTML = btn.key;
                }
            });

            if (this.isCapsLock && !isShiftTrue) {
                capslockBtns.forEach((btn) => {
                    if (btn.capsLockKey) {
                        this.wrapper.querySelector(`[data-key=${btn.keyCode}]`).innerHTML = btn.capsLockKey;
                    }
                });
            } else if (!this.isCapsLock && isShiftTrue) {
                capslockBtns.forEach((btn) => {
                    if (btn.shiftKey) {
                        this.wrapper.querySelector(`[data-key=${btn.keyCode}]`).innerHTML = btn.shiftKey;
                    }
                });
            } else if (this.isCapsLock && isShiftTrue) {
                capslockBtns.forEach((btn) => {
                    if (btn.shiftKey) {
                        this.wrapper.querySelector(`[data-key=${btn.keyCode}]`).innerHTML = btn.shiftKey;
                    }

                    if (btn.capsLockKey) {
                        this.wrapper.querySelector(`[data-key=${btn.keyCode}]`).innerHTML = btn.key;
                    }
                });
            }
        }

        changeTextValue(text) {
            this.textarea.setRangeText(text, this.textarea.selectionStart, this.textarea.selectionEnd, 'end');
            this.textarea.focus();
        }

        changeTextareaSelection(position) {
            this.textarea.selectionStart = position;
            this.textarea.selectionEnd = this.textarea.selectionStart;
            this.textarea.focus();
        }

        toUp() {
            this.changeTextareaSelection(0);
        }

        toDown() {
            this.changeTextareaSelection(this.textarea.value.length);
        }

        toLeft() {
            this.changeTextareaSelection(this.textarea.selectionStart - 1);
        }

        toRight() {
            this.changeTextareaSelection(this.textarea.selectionStart + 1);
        }

        handleTabKeyEvent() {
            this.changeTextValue('\t');
        }

        handleEnterKeyEvent() {
            this.changeTextValue('\n');
        }

        handleBackspaceKeyEvent() {
            const start = this.textarea.selectionStart;
            const end = this.textarea.selectionEnd;
            if (!this.textarea.value || (start === 0 && start === end)) return;

            const currPosition = this.textarea.selectionStart;
            const endPosition = this.textarea.selectionEnd;
            const oldText = this.textarea.value;

            this.textarea.value = '';

            if (currPosition === endPosition) {
                this.changeTextValue(oldText.slice(0, currPosition - 1) + oldText.slice(endPosition));
                this.changeTextareaSelection(currPosition - 1);
            } else {
                this.changeTextValue(oldText.slice(0, currPosition) + oldText.slice(endPosition));
                this.changeTextareaSelection(currPosition);
            }
        }

        handleDeleteKeyEvent() {
            const text = this.textarea;
            if (!text.value || this.textarea.selectionStart === this.textarea.value.length) return;

            const currPosition = this.textarea.selectionStart;
            const endPosition = this.textarea.selectionEnd;
            const oldText = this.textarea.value;

            this.textarea.value = '';

            if (currPosition === endPosition) {
                this.changeTextValue(oldText.slice(0, currPosition) + oldText.slice(currPosition + 1));
                this.changeTextareaSelection(currPosition);
            } else {
                this.changeTextValue(oldText.slice(0, currPosition) + oldText.slice(endPosition));
                this.changeTextareaSelection(currPosition);
            }
        }

        handleKeyDownEvent(ev) {
            const currBtn = this.wrapper.querySelector(`[data-key=${ev.code}]`);

            if (!currBtn) return;

            currBtn.classList.add('active');

            if (ev.ctrlKey && ev.altKey) {
                if (this.lang === 'ru') {
                    this.lang = 'en';
                } else {
                    this.lang = 'ru';
                }
                this.setLang(this.lang);

                setTimeout(() => {
                    this.wrapper.querySelector('[data-key=KeyLang]').innerHTML = this.keys[this.lang][4][0].key;
                    this.renderShiftCapslockButtons(ev.shiftKey);
                }, 100);
            }

            switch (ev.code) {
                case 'ShiftLeft':
                case 'ShiftRight':
                    ev.preventDefault();
                    this.isShift = true;
                    this.isShiftPush = true;
                    this.renderShiftCapslockButtons(ev.shiftKey);
                    break;
                case 'CapsLock':
                    ev.preventDefault();
                    this.isCapsLock = !this.isCapsLock;
                    if (window.navigator.userAgent.includes('Windows')) {
                        currBtn.classList.toggle('isPushed');
                        this.renderShiftCapslockButtons(ev.shiftKey);
                        setTimeout(() => this.wrapper.querySelector('[data-key=CapsLock]').classList.remove('active'), 100);
                    } else {
                        setTimeout(() => currBtn.classList.toggle('isPushed'), 100);
                        this.renderShiftCapslockButtons(ev.shiftKey);
                    }
                    break;
                case 'Tab':
                    ev.preventDefault();
                    this.handleTabKeyEvent();
                    break;
                case 'Backspace':
                    ev.preventDefault();
                    this.handleBackspaceKeyEvent();
                    break;
                case 'NumpadDecimal':
                    ev.preventDefault();
                    this.handleDeleteKeyEvent();
                    break;
                case 'Enter':
                    ev.preventDefault();
                    this.handleEnterKeyEvent();
                    break;
                case 'ControlLeft':
                case 'ControlRight':
                    ev.preventDefault();
                    break;
                case 'AltLeft':
                case 'AltRight':
                    ev.preventDefault();
                    break;
                case 'MetaLeft':
                    ev.preventDefault();
                    break;
                case 'ArrowUp':
                    ev.preventDefault();
                    this.toUp();
                    break;
                case 'ArrowDown':
                    ev.preventDefault();
                    this.toDown();
                    break;
                case 'ArrowLeft':
                    ev.preventDefault();
                    this.toLeft();
                    break;
                case 'ArrowRight':
                    ev.preventDefault();
                    this.toRight();
                    break;
                default:
                    ev.preventDefault();
                    this.changeTextValue(currBtn.innerHTML);
            }
        }

        handleKeyUpEvent(ev) {
            const currBtn = this.wrapper.querySelector(`[data-key=${ev.code}]`);

            if (!currBtn) return;

            switch (ev.code) {
                case 'ShiftLeft':
                case 'ShiftRight':
                    ev.preventDefault();

                    this.isShift = false;
                    this.isShiftPush = false;
                    if (currBtn.classList.contains('isPushed')) {
                        this.wrapper.querySelector('[data-key=ShiftLeft]').classList.remove('isPushed');
                        this.wrapper.querySelector('[data-key=ShiftRight]').classList.remove('isPushed');
                    }
                    this.renderShiftCapslockButtons(ev.shiftKey);
                    break;
                case 'CapsLock':
                    ev.preventDefault();

                    if (window.navigator.userAgent.includes('Windows')) {
                        this.isCapsLock = !this.isCapsLock;
                        currBtn.classList.toggle('isPushed');
                        this.renderShiftCapslockButtons(ev.shiftKey);
                        currBtn.classList.add('active');
                    }

                    break;
                case 'Enter':
                case 'Backspace':
                case 'Tab':
                case 'ControlLeft':
                case 'AltLeft':
                case 'AltRight':
                case 'MetaLeft':
                case 'ControlRight':
                case 'ArrowUp':
                case 'ArrowDown':
                case 'ArrowLeft':
                case 'ArrowRight':
                    ev.preventDefault();
                    break;
                default:
                    ev.preventDefault();
            }

            setTimeout(() => currBtn.classList.remove('active'), 100);
        }

        handleMouseClick(ev) {
            if (!ev.target.classList.contains('keyboard__btn')) return;

            const currBtn = this.wrapper.querySelector(`[data-key=${ev.target.dataset.key}]`);

            switch (ev.target.dataset.key) {
                case 'KeyLang':
                    if (this.lang === 'ru') {
                        this.lang = 'en';
                    } else {
                        this.lang = 'ru';
                    }
                    this.setLang(this.lang);

                    setTimeout(() => {
                        this.renderShiftCapslockButtons();
                        currBtn.innerHTML = this.keys[this.lang][4][0].key;
                    }, 100);
                    break;
                case 'ShiftLeft':
                case 'ShiftRight':
                    this.isShift = !this.isShift;

                    if (this.isShift) {
                        this.wrapper.querySelector('[data-key=ShiftLeft]').classList.add('isPushed');
                        this.wrapper.querySelector('[data-key=ShiftRight]').classList.add('isPushed');
                    } else {
                        this.wrapper.querySelector('[data-key=ShiftLeft]').classList.remove('isPushed');
                        this.wrapper.querySelector('[data-key=ShiftRight]').classList.remove('isPushed');
                    }

                    this.renderShiftCapslockButtons();
                    break;
                case 'CapsLock':
                    this.isCapsLock = !this.isCapsLock;
                    currBtn.classList.toggle('isPushed');
                    this.renderShiftCapslockButtons();
                    break;
                case 'Tab':
                    this.handleTabKeyEvent();
                    break;
                case 'Backspace':
                    this.handleBackspaceKeyEvent();
                    break;
                case 'NumpadDecimal':
                    this.handleDeleteKeyEvent();
                    break;
                case 'Enter':
                    this.handleEnterKeyEvent();
                    break;
                case 'ControlLeft':
                case 'ControlRight':
                    break;
                case 'AltLeft':
                case 'AltRight':
                    break;
                case 'MetaLeft':
                    break;
                case 'ArrowUp':
                    ev.preventDefault();
                    this.toUp();
                    break;
                case 'ArrowDown':
                    ev.preventDefault();
                    this.toDown();
                    break;
                case 'ArrowLeft':
                    ev.preventDefault();
                    this.toLeft();
                    break;
                case 'ArrowRight':
                    ev.preventDefault();
                    this.toRight();
                    break;
                default:
                    this.changeTextValue(ev.target.innerHTML);
                    if (!this.isShiftPush && this.isShift) {
                        this.isShift = false;
                        this.wrapper.querySelector('[data-key=ShiftLeft').classList.remove('isPushed');
                        this.wrapper.querySelector('[data-key=ShiftRight').classList.remove('isPushed');
                        this.renderShiftCapslockButtons();
                    }
            }
            ev.target.classList.add('active');

            setTimeout(() => ev.target.classList.remove('active'), 100);
        }

        init() {
            this.keyboard = createElement('div', document.body, 'keyboard');

            const keyboardOutput = createElement('div', this.keyboard, 'keyboard__output');

            this.textarea = createElement('textarea', keyboardOutput, 'keyboard__input');

            const keyboardInfo = createElement('div', keyboardOutput, 'keyboard__info');

            const keyboardBundle = createElement('div', keyboardInfo, 'keyboard__bundle');

            keyboardBundle.append('Available hotkeys:\n1. Ctrl + Alt - switch language');

            const keyboardOs = createElement('div', keyboardInfo, 'keyboard__os');

            keyboardOs.append('Please pay attention:\nYou\'re using an experimental Windows OS based system.');

            this.wrapper = createElement('div', this.keyboard, 'keyboard__wrapper');

            this.keys[this.lang].forEach((line) => {
                const btnLine = createElement('div', this.wrapper, 'keyboard__line');

                line.forEach((button) => {
                    const btnClasses = ['keyboard__btn'];

                    if (button.keyClasses) btnClasses.push(button.keyClasses);

                    const btn = createElement('div', btnLine, ...btnClasses);
                    btn.innerHTML = button.key;
                    btn.dataset.key = button.keyCode;
                });
            });

            this.wrapper.addEventListener('click', this.handleMouseClick.bind(this));
            window.addEventListener('mouseover', (ev) => {
                if (!ev.target.classList.contains('keyboard__btn')) return;
                ev.target.classList.add('hover');
            });
            window.addEventListener('mouseout', (ev) => {
                if (!ev.target.classList.contains('keyboard__btn')) return;
                ev.target.classList.remove('hover');
            });
            window.addEventListener('keydown', this.handleKeyDownEvent.bind(this));
            window.addEventListener('keyup', this.handleKeyUpEvent.bind(this));

            this.textarea.focus();
        }
    }

    const keyboard = new Keyboard();
    keyboard.init();
});
