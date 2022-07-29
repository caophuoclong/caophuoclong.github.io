class Portfolio {
  converter = new showdown.Converter();
  navBar = [
    'home',
    'about',
    'skills',
    'experiences',
    'projects',
    'education',
    'contact',
  ];
  imgPath = './assets/icons/';
  iconLanguagePath = {
    ReactJS: this.imgPath + 'reactjs-icon.svg',
    TypeScript: this.imgPath + 'typescriptlang-icon.svg',
    NodeJS: this.imgPath + 'nodejs-icon.svg',
    'Socket.io': this.imgPath + 'socketio-icon.svg',
    MySql: this.imgPath + 'mysql-icon.svg',
    MongoDB: this.imgPath + 'mongodb-icon.svg',
    Linux: this.imgPath + 'linux-icon.svg',
    ExpressJS: this.imgPath + 'expressjs-icon.svg',
    Github: this.imgPath + 'github-icon.svg',
    HTML5: this.imgPath + 'w3_html5-icon.svg',
    CSS3: this.imgPath + 'w3_css-icon.svg',
    Javascript: this.imgPath + 'javascript-icon.svg',
    TailwindCSS: this.imgPath + 'tailwindcss-icon.svg',
    SASS: this.imgPath + 'sass-lang-icon.svg',
    Sun: this.imgPath + 'sun.svg',
    Dark: this.imgPath + 'dark.svg',
  };
  mySkills = [
    'HTML5',
    'CSS3',
    'ReactJS',
    'TypeScript',
    'NodeJS',
    'Socket.io',
    'MySql',
    'MongoDB',
    'Linux',
    'ExpressJS',
    'Github',
    'Javascript',
    'TailwindCSS',
    'SASS',
  ];
  iconWebSite = {
    web: this.imgPath + 'website.svg',
    github: this.imgPath + 'github.svg',
  };
  expirences = [
    {
      title: 'Fresher Fullstack Web Developer',
      company: 'Gcalls',
      location: 'VietNam',
      date: {
        // month from 0 to 11
        from: new Date(2022, 0),
        to: new Date(2022, 2),
      },
      descriptions: [
        'Working in miro service project.',
        'Participate in the deplyment proccess.',
        'Add new features to the project (export contacts through GSheet).',
        'Write scripts.',
      ],
    },
    {
      title: 'Intern Fullstack Web Developer',
      company: 'Gcalls',
      location: 'VietNam',
      date: {
        // month from 0 to 11
        from: new Date(2021, 7),
        to: new Date(2021, 10),
      },
      descriptions: [
        'Use pupperteer to create an application which can crawl data.',
        'Design and implement a callbox application use ReactJS Typescript.',
        'Add a new feature to the application use Google App Script.',
        'Learn how to write documentation for the application.',
      ],
    },
  ];
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  static handleShowDirect() {
    const navBar = document.querySelector('#direct');
    console.log(navBar.style.display);
    if (navBar.style.display === 'flex') {
      navBar.style.display = 'none';
    } else {
      navBar.style.display = 'flex';
    }
  }
  static showLoading(boo) {
    const loading = document.querySelector('#loading');
    const body = document.querySelector('body');
    if (boo) {
      loading.style.display = 'flex';
      body.style.overflow = 'hidden';
    } else {
      loading.style.display = 'none';
      body.style.overflow = 'auto';
    }
  }
  handleSendForm(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const subject = form.subject.value;
    const email = form.email.value;
    const message = form.message.value;
    console.log($.ajax);
    if (!name || !subject || !email || !message) {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill the full information!',
        icon: 'error',
        confirmButtonText: 'Okay',
      });
      return;
    } else {
      Portfolio.showLoading(true);
      $.ajax({
        url: 'https://api.telegram.org/bot5532859458:AAGGVC9JE4aeK-H4rO0rY1bam0JEHCRspOU/sendMessage',
        type: 'POST',
        data: {
          chat_id: '5323622268',
          text: `- Name: ${name}\n - Email: ${email}\n - Subject: ${subject}\n - Message: ${message}\n`,
        },
        success: (data) => {
          Portfolio.showLoading(false);
          Swal.fire({
            title: 'Success!',
            text: 'Thanks for sending me your message!',
            icon: 'success',
            confirmButtonText: 'Cool',
          });
          form.reset();
        },
      });
    }
  }

  fadeIn() {
    let elementsArray = document.querySelectorAll('.tile');

    for (var i = 0; i < elementsArray.length; i++) {
      var elem = elementsArray[i];
      var distInView =
        elem.getBoundingClientRect().top - window.innerHeight + 20;
      if (distInView < 0) {
        elem.classList.add('inView');
      } else {
        elem.classList.remove('inView');
      }
    }
  }
  addSelected(selected) {
    const tag = document.querySelector(`[href="#${selected || 'home'}"]`);
    const tags = document.querySelectorAll('nav a');
    tags.forEach((tag) => tag.classList.remove('selected'));
    tag.classList.add('selected');
  }
  static tapToShow(el) {
    const nextSibling = document.querySelector(`#${el}`);
    if (nextSibling.classList.contains('hide')) {
      nextSibling.classList.remove('hide');
    } else {
      nextSibling.classList.add('hide');
    }
  }

  initNavBar() {
    let html = '';
    this.navBar.forEach((link) => {
      html += `<div class="box">
    <a class="custom-underline" href="#${link}">${this.capitalizeFirstLetter(
        link
      )}</a>
  </div>`;
    });
    document.querySelector('nav').innerHTML = html;
  }
  initShowUp() {
    const showUp = document.querySelector('.showUp');
    const typewriter = new Typewriter(showUp, {
      loop: true,
    });
    typewriter
      .pauseFor(500)
      .typeString('Web Developer')
      .pauseFor(300)
      .deleteAll()
      .typeString('MERN Stack Developer')
      .deleteAll()
      .start();
  }
  initProjectShow() {
    const projects = [
      {
        name: 'Chat App',
        image: './assets/images/projects/chatapp.png',
        technicals: [
          'ReactJS',
          'NodeJS',
          'Socket.io',
          'TypeScript',
          'TailwindCSS',
        ],
        descriptions:
          '- Application allow user can communicate with another user.\n - New feeds.\n - Send Message ',
        responsibility: 'Design view, database, and implement the app.',
        members: 1,
        link: {
          web: 'https://caophuoclong.github.com',
          github: '',
        },
      },
    ];
    let projectsHTML = '';
    projects.forEach((project) => {
      let techhh = '';
      project.technicals.forEach(
        (techh) =>
          (techhh += `<div class='project__items__item__technicals__technical'>
      <img
        class='project__items__item__technicals__technical__image'
        src=${this.iconLanguagePath[techh]}
      />
      ${techh}
    </div>`)
      );
      projectsHTML += `
<div class="tile bottom-right">
<div class="project__items__item ">
<img class="project__items__item__image " src="${project.image}" alt="">
<p class="project__items__item__name">${project.name}</p>
<!-- Paragraph description -->
<div class="project__items__item__responsibility">
Responsibility: ${project.responsibility}
</div>
<div class="project__items__item__member">
Member: ${project.members}
</div>
<div class="project__items__item__description">
Descriptions: <br/>
${this.converter.makeHtml(project.descriptions)}</div>
<div class="project__items__item__technicals">
${techhh}
</div>
<div class="project__items__item__link">
  ${
    project.link.web.length > 0
      ? `<a class="project__items__item__link__web" title="Website" href="${project.link.web}">
      <img
          class='project__items__item__link__img'
          src="${this.iconWebSite['web']}"
        />
    </a>`
      : ''
  }
  ${
    project.link.github.length > 0
      ? `<a
        class='project__items__item__link__github'
        title='Github'
        href='${project.link.github}'
      >
        <img
          class='project__items__item__link__img'
          src="${iconWeb['github']}"
        />
      </a>`
      : ''
  }
</div>
</div>
           
          </div>`;
    });
    document.querySelector('#project_list').innerHTML = projectsHTML;
  }
  initExpirences() {
    let expTimeLine = '';
    this.expirences.forEach((exp) => {
      let descs = '';
      exp.descriptions.forEach((desc) => {
        descs += `<li>${desc}</li>`;
      });
      expTimeLine += `
  <div class="timeline__item">
  <div class="timeline__content">
    <div class="work">
      <span class="work__position">${exp.title}</span>
      <!-- Where u work -->
      <span class="work__address">@${exp.company}, ${exp.location}</span>
      <!-- Time -->
      <span class="work__time">${moment(exp.date.from).format(
        'MMM, YYYY'
      )} - ${moment(exp.date.to).format('MMM, YYYY')}</span>
      <ul class="work__description">
        ${descs}
      </ul>
    </div>
  </div>
</div>`;
    });
    document.querySelector('#expirence_timeline').innerHTML = expTimeLine;
    timeline(document.querySelectorAll('.timeline'), {
      verticalStartPosition: 'right',
      verticalTrigger: '150px',
    });
  }
  initSkills() {
    let skillsShow = '';
    this.mySkills.forEach(
      (skill) =>
        (skillsShow += `<div class="item">
<img src=${this.iconLanguagePath[skill]} alt="" srcset="" />
<p class="skills__show__title">${skill}</p>
</div>`)
    );
    document.querySelector('.skills__show').innerHTML = skillsShow;
  }
  initIntro() {
    const introMySelf = `**Hi, I'm Tran Cao Phuoc Long**.\n
I'm a senior student at **Can Tho University**, I'm majoring in **Software Engineering**. I expect graduated in Spring, 2024. \n
I'm looking forward to work in a professional environment, that help me improve my skills and knowledge.\n
I alway put my heart and soul into work, and I'm always looking for new opportunities to learn and grow.\n 
I spent 6 months for learning ReactJS, TypeScript, NodeJS, Socket.io, and I'm very happy with the result.
\nThrerefore, I'm looking forward to work with a team to build a better product.\n
Apart from coding, I also like to play games, do sport and listen to music. \n
That is all I have to share with you. Thank for reading.
  `;
    const homeIntro = `
In this site, you can find my resume, my skills, my work, and my contact.\n
I code this project with **HTML5, CSS3 and JavaScript**.
`;
    document.querySelector('#introMySelf').innerHTML =
      this.converter.makeHtml(introMySelf);
    document.querySelector('#homeIntro').innerHTML =
      this.converter.makeHtml(homeIntro);
  }
  setUp() {
    this.initNavBar();
    this.initShowUp();
    this.initProjectShow();
    this.initExpirences();
    this.initSkills();
    this.initIntro();
  }
  static toggleDarkMode() {
    const body = document.querySelector('body');
    const btn = document.querySelector('.btn-theme-change');
    const portfolio = new Portfolio();
    if (body.classList.contains('dark-mode')) {
      body.classList.remove('dark-mode');
      btn.innerHTML = `<img src="${portfolio.iconLanguagePath.Dark}"/>`;
    } else {
      body.classList.add('dark-mode');
      btn.innerHTML = `<img src="${portfolio.iconLanguagePath.Sun}"/>`;
    }
    window.localStorage.setItem(
      'dark-mode',
      body.classList.contains('dark-mode')
    );
  }
  handler() {
    // window.addEventListener('scroll', (e) => {
    //   if(e.dou)
    // })
    window.addEventListener('load', () => {
      const body = document.querySelector('body');
      const windowWidth = window.innerWidth;
      if (windowWidth < 767) {
        document.querySelector('#direct').style.display = 'none';
      }
      const isDark = window.localStorage.getItem('dark-mode');
      const btn = document.querySelector('.btn-theme-change');
      if (isDark) {
        body.classList.add('dark-mode');
        btn.innerHTML = `<img src="${portfolio.iconLanguagePath.Sun}"/>`;
      } else {
        body.classList.remove('dark-mode');
        btn.innerHTML = `<img src="${portfolio.iconLanguagePath.Dark}"/>`;
      }
    });
    window.addEventListener('resize', () => {
      const windowWidth = window.innerWidth;
      // if (windowWidth > 600) {
      //   document.querySelector('#direct').style.display = 'flex';
      // }
    });
    document
      .querySelector('#myForm')
      .addEventListener('submit', this.handleSendForm);

    const url = document.baseURI;
    const selected = url.split('#')[1] || 'home';
    window.addEventListener('load', () => {
      this.addSelected(selected);
      document.querySelector(`#${selected}`).scrollIntoView();
    });
    window.addEventListener('popstate', (e) => {
      const url = window.location.href.split('#')[1];
      this.addSelected(url);
      const windowWidth = window.innerWidth;
      console.log(windowWidth);
      if (windowWidth < 600) {
        document.querySelector('#direct').style.display = 'none';
      }
    });
    let lastScrollTop = 0;
    window.addEventListener('scroll', (e) => {
      const prevSelected = document.querySelector('.selected');
      const nameHref = prevSelected
        ? prevSelected.getAttribute('href').replace('#', '')
        : '';
      const innerHeight = window.innerHeight;
      let currentPos, nextPos;
      currentPos = this.navBar.indexOf(nameHref);
      const xyz = document.querySelector(`#${this.navBar[currentPos]}`);
      const rect = document.querySelector(`#${this.navBar[currentPos]}`)
        ? document
            .querySelector(`#${this.navBar[currentPos]}`)
            .getBoundingClientRect()
        : '';
      const st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > lastScrollTop) {
        nextPos = currentPos + 1;
        if (innerHeight - rect.bottom >= 500) {
          this.addSelected(this.navBar[nextPos]);
          document.querySelector('body').style.overflow = 'hidden';
          window.location.href = `#${this.navBar[nextPos]}`;
          setTimeout(() => {
            document.querySelector('body').style.overflow = 'auto';
          }, 50);
        }
      } else {
        if (currentPos === 0) {
          nextPos = 0;
        } else nextPos = currentPos - 1;
        if (innerHeight - rect.top <= 350) {
          this.addSelected(this.navBar[nextPos]);
          // window.location.href = `#${this.navBar[nextPos]}`;
        }
      }
      lastScrollTop = st;
    });

    window.addEventListener('scroll', this.fadeIn);
  }
}
const portfolio = new Portfolio();
portfolio.setUp();
portfolio.handler();
