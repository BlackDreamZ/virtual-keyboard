(() => {
  "use strict";
  class e {
    constructor({ id: e, name: t, img: i, ...a }) {
      (this.id = e), (this.name = t), (this.img = i);
    }
    generateCard() {
      let e = "",
        t = document.createElement("div");
      return (
        (t.className = "friends__card"),
        t.setAttribute("data-id", this.id),
        this.img &&
          (e += `<img class="friends__img" src=${this.img} alt="pet">`),
        this.name && (e += `<p class="friends__name">${this.name}</p>`),
        (e += '<button class="button button_bordered">Learn more</button>'),
        (t.innerHTML = e),
        t
      );
    }
  }
  class t extends class {
    constructor(e) {
      (this.classes = e),
        (this.modal = ""),
        (this.modalContent = ""),
        (this.modalCloseBtn = ""),
        (this.overlay = "");
    }
    buildModal(e) {
      (this.overlay = this.createDomNode(
        this.overlay,
        "div",
        "overlay",
        "overlay_modal"
      )),
        (this.modal = this.createDomNode(
          this.modal,
          "div",
          "modal",
          this.classes
        )),
        (this.modalContent = this.createDomNode(
          this.modalContent,
          "div",
          "modal__content"
        )),
        (this.modalCloseBtn = this.createDomNode(
          this.modalCloseBtn,
          "div",
          "modal__close-icon"
        )),
        (this.modalCloseBtn.innerHTML =
          '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.42618 6.00003L11.7046 1.72158C12.0985 1.32775 12.0985 0.689213 11.7046 0.295433C11.3108 -0.0984027 10.6723 -0.0984027 10.2785 0.295433L5.99998 4.57394L1.72148 0.295377C1.32765 -0.098459 0.68917 -0.098459 0.295334 0.295377C-0.0984448 0.689213 -0.0984448 1.32775 0.295334 1.72153L4.57383 5.99997L0.295334 10.2785C-0.0984448 10.6723 -0.0984448 11.3108 0.295334 11.7046C0.68917 12.0985 1.32765 12.0985 1.72148 11.7046L5.99998 7.42612L10.2785 11.7046C10.6723 12.0985 11.3108 12.0985 11.7046 11.7046C12.0985 11.3108 12.0985 10.6723 11.7046 10.2785L7.42618 6.00003Z" fill="#292929"/></svg>'),
        this.setContent(e),
        this.appendModalElements(),
        this.bindEvents(),
        this.openModal();
    }
    createDomNode(e, t, ...i) {
      return (e = document.createElement(t)).classList.add(...i), e;
    }
    setContent(e) {
      "string" == typeof e
        ? (this.modalContent.innerHTML = e)
        : ((this.modalContent.innerHTML = ""), this.modalContent.append(e));
    }
    appendModalElements() {
      this.modal.append(this.modalCloseBtn),
        this.modal.append(this.modalContent),
        this.overlay.append(this.modal);
    }
    bindEvents() {
      this.modalCloseBtn.addEventListener("click", this.closeModal),
        this.overlay.addEventListener("click", this.closeModal);
    }
    openModal() {
      document.body.append(this.overlay),
        document.body.classList.toggle("lock");
    }
    closeModal(e) {
      let t = e.target.classList;
      (t.contains("overlay_modal") || t.contains("modal__close-icon")) &&
        (e.stopPropagation(),
        document.querySelector(".overlay_modal").remove(),
        document.body.classList.remove("lock"));
    }
  } {
    constructor(
      e,
      {
        id: t,
        name: i,
        img: a,
        type: s,
        breed: n,
        description: o,
        age: r,
        inoculations: d,
        diseases: l,
        parasites: c,
      }
    ) {
      super(e),
        (this.id = t),
        (this.name = i),
        (this.img = a),
        (this.type = s),
        (this.breed = n),
        (this.description = o),
        (this.age = r),
        (this.inoculations = d),
        (this.diseases = l),
        (this.parasites = c);
    }
    generateContent() {
      let e = "",
        t = document.createElement("div");
      return (
        (t.className = "card-modal__content"),
        this.img &&
          (e += `<img class="friends__img modal__img" src=${this.img} alt="pet">`),
        (this.name ||
          this.type ||
          this.breed ||
          this.description ||
          this.age ||
          this.inoculations ||
          this.diseases ||
          this.parasites) &&
          ((e += '<div class="friends__content">'),
          this.name && (e += `<h3 class="friends__name">${this.name}</h3>`),
          this.type &&
            (e += `<p class="friends__type">${this.type} - ${this.breed}</p>`),
          this.description &&
            (e += `<p class="friends__description">${this.description}</p>`),
          (e += '<ul class="friends__list">'),
          this.age &&
            (e += `<li class="friends__item"><b>Age:</b> ${this.age}</li>`),
          this.inoculations &&
            (e += `<li class="friends__item"><b>Inoculations:</b> ${this.inoculations.join(
              ", "
            )}</li>`),
          this.diseases &&
            (e += `<li class="friends__item"><b>Diseases:</b> ${this.diseases.join(
              ", "
            )}</li>`),
          this.parasites &&
            (e += `<li class="friends__item"><b>Parasites:</b> ${this.parasites.join(
              ", "
            )}</li>`),
          (e += "</ul>"),
          (e += "</div>")),
        (t.innerHTML = e),
        t
      );
    }
    renderModal() {
      let e = this.generateContent();
      super.buildModal(e);
    }
  }
  const i = [
    {
      id: 1,
      name: "Jennifer",
      img: "../../assets/images/pets-jennifer.png",
      type: "Dog",
      breed: "Labrador",
      description:
        "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
      age: "2 months",
      inoculations: ["none"],
      diseases: ["none"],
      parasites: ["none"],
    },
    {
      id: 2,
      name: "Sophia",
      img: "../../assets/images/pets-sophia.png",
      type: "Dog",
      breed: "Shih tzu",
      description:
        "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
      age: "1 month",
      inoculations: ["parvovirus"],
      diseases: ["none"],
      parasites: ["none"],
    },
    {
      id: 3,
      name: "Woody",
      img: "../../assets/images/pets-woody.png",
      type: "Dog",
      breed: "Golden Retriever",
      description:
        "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
      age: "3 years 6 months",
      inoculations: ["adenovirus", "distemper"],
      diseases: ["right back leg mobility reduced"],
      parasites: ["none"],
    },
    {
      id: 4,
      name: "Scarlett",
      img: "../../assets/images/pets-scarlet.png",
      type: "Dog",
      breed: "Jack Russell Terrier",
      description:
        "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
      age: "3 months",
      inoculations: ["parainfluenza"],
      diseases: ["none"],
      parasites: ["none"],
    },
    {
      id: 5,
      name: "Katrine",
      img: "../../assets/images/pets-katrine.png",
      type: "Cat",
      breed: "British Shorthair",
      description:
        "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
      age: "6 months",
      inoculations: ["panleukopenia"],
      diseases: ["none"],
      parasites: ["none"],
    },
    {
      id: 6,
      name: "Timmy",
      img: "../../assets/images/pets-timmy.png",
      type: "Cat",
      breed: "British Shorthair",
      description:
        "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
      age: "2 years 3 months",
      inoculations: ["calicivirus", "viral rhinotracheitis"],
      diseases: ["kidney stones"],
      parasites: ["none"],
    },
    {
      id: 7,
      name: "Freddie",
      img: "../../assets/images/pets-freddie.png",
      type: "Cat",
      breed: "British Shorthair",
      description:
        "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
      age: "2 months",
      inoculations: ["rabies"],
      diseases: ["none"],
      parasites: ["none"],
    },
    {
      id: 8,
      name: "Charly",
      img: "../../assets/images/pets-charly.png",
      type: "Dog",
      breed: "Jack Russell Terrier",
      description:
        "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
      age: "8 years",
      inoculations: ["bordetella bronchiseptica", "leptospirosis"],
      diseases: ["deafness", "blindness"],
      parasites: ["lice", "fleas"],
    },
  ];
  window.onload = function () {
    if (i && document.querySelector("#main-page")) {
      s();
      const e = document.querySelector(".friends__arrow_left"),
        t = document.querySelector(".friends__arrow_right"),
        i = document.querySelector(".carousel"),
        n = document.querySelector(".item-left"),
        r = document.querySelector(".item-right"),
        d = document.querySelector(".item-active"),
        l = () => {
          (n.innerHTML = ""),
            o().forEach((e) => {
              n.append(e.generateCard());
            }),
            i.classList.add("transition-left"),
            e.removeEventListener("click", l),
            t.removeEventListener("click", c);
        },
        c = () => {
          (r.innerHTML = ""),
            o().forEach((e) => {
              r.append(e.generateCard());
            }),
            i.classList.add("transition-right"),
            e.removeEventListener("click", l),
            t.removeEventListener("click", c);
        };
      e.addEventListener("click", l),
        t.addEventListener("click", c),
        i.addEventListener("animationend", (s) => {
          let h;
          "move-left" === s.animationName
            ? (i.classList.remove("transition-left"),
              (h = n),
              (d.innerHTML = n.innerHTML))
            : (i.classList.remove("transition-right"),
              (h = r),
              (d.innerHTML = r.innerHTML)),
            a.length > 0 && a.splice(0, a.length);
          let m = d.innerHTML,
            p = -1;
          for (; -1 != (p = m.indexOf("data-id", p + 1)); )
            a.push(m[p + 9] - 1);
          (h.innerHTML = ""),
            o().forEach((e) => {
              h.append(e.generateCard());
            }),
            e.addEventListener("click", l),
            t.addEventListener("click", c);
        });
    }
    if (i && document.querySelector("#pets-page")) {
      r();
      const e = document.querySelector(".friends__cards_pets");
      e.innerHTML = "";
      let t = h();
      t[0].forEach((t) => e.append(t.generateCard()));
      const i = document.querySelector(".friends__arrow_pets_first-page"),
        a = document.querySelector(".friends__arrow_pets_last-page"),
        s = document.querySelector(".friends__arrow_pets_left"),
        n = document.querySelector(".friends__arrow_pets_right"),
        o = document.querySelector(".friends__arrow_active"),
        d = document.querySelector(".pagination__link_first-page"),
        l = document.querySelector(".pagination__link_last-page"),
        c = document.querySelector(".pagination__link_left"),
        m = document.querySelector(".pagination__link_right");
      let p = 1;
      i.addEventListener("click", () => {
        (p = 1),
          m.classList.remove("inactive"),
          l.classList.remove("inactive"),
          c.classList.add("inactive"),
          d.classList.add("inactive"),
          (e.innerHTML = ""),
          t[0].forEach((t) => e.append(t.generateCard())),
          (o.innerHTML = `${p}`);
      }),
        a.addEventListener("click", () => {
          (p = t.length),
            m.classList.add("inactive"),
            l.classList.add("inactive"),
            c.classList.remove("inactive"),
            d.classList.remove("inactive"),
            (e.innerHTML = ""),
            t[t.length - 1].forEach((t) => e.append(t.generateCard())),
            (o.innerHTML = `${p}`);
        }),
        s.addEventListener("click", () => {
          p--,
            m.classList.remove("inactive"),
            l.classList.remove("inactive"),
            p > 1
              ? ((e.innerHTML = ""),
                t[p - 1].forEach((t) => e.append(t.generateCard())),
                (o.innerHTML = `${p}`))
              : 1 === p &&
                ((e.innerHTML = ""),
                t[p - 1].forEach((t) => e.append(t.generateCard())),
                (o.innerHTML = `${p}`),
                c.classList.add("inactive"),
                d.classList.add("inactive"));
        }),
        n.addEventListener("click", () => {
          p++,
            c.classList.remove("inactive"),
            d.classList.remove("inactive"),
            p < t.length
              ? ((e.innerHTML = ""),
                t[p - 1].forEach((t) => e.append(t.generateCard())),
                (o.innerHTML = `${p}`))
              : p === t.length &&
                ((e.innerHTML = ""),
                t[p - 1].forEach((t) => e.append(t.generateCard())),
                (o.innerHTML = `${p}`),
                m.classList.add("inactive"),
                l.classList.add("inactive"));
        });
    }
  };
  let a = [];
  const s = () => {
      o().forEach((e) => {
        document.querySelector(".item-left").append(e.generateCard());
      }),
        o().forEach((e) => {
          document.querySelector(".item-active").append(e.generateCard()),
            a.push(e.id - 1);
        }),
        o().forEach((e) => {
          document.querySelector(".item-right").append(e.generateCard());
        }),
        r();
    },
    n = (t) => {
      let i = [];
      return (
        t.forEach((t) => {
          i.push(new e(t));
        }),
        i
      );
    };
  let o = () => {
    let e,
      t,
      s = n(i),
      o = [];
    for (
      window.matchMedia("(min-width: 1280px)").matches
        ? (t = 3)
        : window.matchMedia("(min-width: 768px) and (max-width: 1279px)")
            .matches
        ? (t = 2)
        : window.matchMedia("(max-width: 767px)").matches && (t = 1);
      o.length < t;

    )
      (e = Math.floor(Math.random() * s.length)),
        o.includes(e) || a.includes(e) || o.push(e);
    return o.map((e) => s[e]);
  };
  const r = () => {
      document
        .querySelector(".friends__cards")
        .addEventListener("click", (e) => {
          if (e.target.closest(".friends__card")) {
            let t = e.target.closest(".friends__card").getAttribute("data-id"),
              i = d(t);
            l(i);
          }
        });
    },
    d = (e) => i.find((t) => t.id == e),
    l = (e) => {
      new t("card-modal", e).renderModal();
    };
  let c = () => {
      let e,
        t,
        a = n(i),
        s = [];
      for (
        window.matchMedia("(min-width: 1280px)").matches
          ? (t = 8)
          : window.matchMedia("(min-width: 768px) and (max-width: 1279px)")
              .matches
          ? (t = 6)
          : window.matchMedia("(max-width: 767px)").matches && (t = 3);
        s.length < t;

      )
        (e = Math.floor(Math.random() * a.length)), s.includes(e) || s.push(e);
      return s;
    },
    h = () => {
      let e = n(i);
      return (() => {
        let e,
          t = [];
        for (
          window.matchMedia("(min-width: 1280px)").matches
            ? (e = 6)
            : window.matchMedia("(min-width: 768px) and (max-width: 1279px)")
                .matches
            ? (e = 8)
            : window.matchMedia("(max-width: 767px)").matches && (e = 16);
          t.length < e;

        ) {
          let e = c();
          t.includes(e) || t.push(e);
        }
        return t;
      })().map((t) => t.map((t) => e[t]));
    };
  const m = (e) => {
    (e.target.classList.contains("nav__link") ||
      e.target.classList.contains("overlay")) &&
      (document.querySelector(".hamburger").classList.remove("open"),
      document.querySelector(".nav").classList.remove("open"),
      document.querySelector(".overlay").classList.remove("active"),
      document.body.classList.remove("lock"));
  };
  document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector(".hamburger").classList.toggle("open"),
      document.querySelector(".nav").classList.toggle("open"),
      document.querySelector(".overlay").classList.toggle("active"),
      document.body.classList.toggle("lock");
  }),
    document.querySelector(".nav").addEventListener("click", m),
    document.querySelector(".overlay").addEventListener("click", m);
})();