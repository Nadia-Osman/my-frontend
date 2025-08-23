document.addEventListener('DOMContentLoaded', () => {

  // =====================
  // Navigation
  // =====================
  function showSection(id){
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(id).classList.add('active');
  }

  function go(url){ window.location.href = url; }

  // =====================
  // Contact Popup
  // =====================
  const contactBtn = document.getElementById('contactBtn');
  const contactPopup = document.getElementById('contactPopup');
  const closePopup = document.getElementById('closePopup');

  contactBtn.addEventListener('click', () => contactPopup.style.display = 'flex');
  closePopup.addEventListener('click', () => contactPopup.style.display = 'none');
  window.addEventListener('click', e => { if(e.target == contactPopup) contactPopup.style.display='none'; });

  // =====================
  // EmailJS Integration
  // =====================
  emailjs.init("RpeYE2gfCXDBocPRz");

  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', function(e){
    e.preventDefault();

    emailjs.sendForm('service_xtduavr', 'template_o2fkjcp', this)
      .then(() => {
        // Show feedback to user
        alert("Message sent successfully!");
        this.reset();
        contactPopup.style.display = 'none';
      })
      .catch(err => {
        console.error("EmailJS error:", err);
        alert("Failed to send message. Please try again later.");
      });
  });

  // =====================
  // Quiz
  // =====================
  const quizzes = {
    quran:[
      {q:"What is the first Surah of the Qur’an?", options:["Al-Fatiha","Al-Baqarah","Al-Imran"], answer:"Al-Fatiha"},
      {q:"Which Surah is the longest?", options:["Al-Baqarah","Al-Fatiha","Yasin"], answer:"Al-Baqarah"},
      {q:"Which Surah is known as 'The Heart of the Qur’an'?", options:["Yasin","Al-Fatiha","Al-Kahf"], answer:"Yasin"}
    ],
    prayers:[
      {q:"How many daily prayers are there?", options:["3","5","7"], answer:"5"},
      {q:"Which prayer is performed at dawn?", options:["Fajr","Maghrib","Isha"], answer:"Fajr"},
      {q:"Which prayer is the last of the day?", options:["Isha","Asr","Dhuhr"], answer:"Isha"}
    ],
    pillars:[
      {q:"How many pillars of Islam are there?", options:["4","5","6"], answer:"5"},
      {q:"What is Zakat?", options:["Prayer","Charity","Fasting"], answer:"Charity"},
      {q:"Which pillar is the declaration of faith?", options:["Shahada","Salah","Hajj"], answer:"Shahada"}
    ],
    names:[
      {q:"How many names of Allah are there?", options:["99","100","120"], answer:"99"},
      {q:"Which name means 'The Merciful'?", options:["Ar-Rahman","Al-Quddus","Al-Malik"], answer:"Ar-Rahman"},
      {q:"Which name means 'The Provider'?", options:["Ar-Razzaq","Al-Aziz","Al-Hakeem"], answer:"Ar-Razzaq"}
    ]
  };

  const quizTabs = document.querySelectorAll('.quiz-tab');
  const quizCards = document.getElementById('quizCards');
  const scoreDisplay = document.getElementById('scoreDisplay');
  let currentQuiz = 'quran';
  let savedAnswers = JSON.parse(localStorage.getItem('quizAnswers')) || {};

  function renderQuiz(key=currentQuiz){
    currentQuiz = key;
    quizCards.innerHTML = '';
    let score = 0;

    quizzes[key].forEach((qObj, idx)=>{
      const card = document.createElement('div');
      card.className = 'quiz-card';
      const question = document.createElement('h3');
      question.textContent = `Q${idx+1}: ${qObj.q}`;
      card.appendChild(question);

      qObj.options.forEach(opt=>{
        const btn = document.createElement('button');
        btn.textContent = opt;

        btn.addEventListener('click', () => {
          savedAnswers[currentQuiz] = savedAnswers[currentQuiz] || [];
          savedAnswers[currentQuiz][idx] = opt;
          localStorage.setItem('quizAnswers', JSON.stringify(savedAnswers));

          Array.from(card.querySelectorAll('button')).forEach(b => {
            b.disabled = true;
            if(b.textContent === qObj.answer) {
              b.style.background = '#4caf50';
              b.style.color = 'white';
            } else if(b.textContent === opt) {
              b.style.background = '#f44336';
              b.style.color = 'white';
            }
          });

          // Calculate score
          score = savedAnswers[currentQuiz].reduce((acc, ans, i) => ans === quizzes[currentQuiz][i].answer ? acc + 1 : acc, 0);
          scoreDisplay.textContent = `Your Score: ${score} / ${quizzes[currentQuiz].length}`;
        });

        card.appendChild(btn);
      });

      quizCards.appendChild(card);
    });
  }

  // Initial render
  renderQuiz(currentQuiz);

  // Switch quizzes
  quizTabs.forEach(tab=>{
    tab.addEventListener('click', ()=>{
      renderQuiz(tab.dataset.quiz);
    });
  });

  // Reset quiz
  document.getElementById('resetQuiz').addEventListener('click', ()=>{
    savedAnswers[currentQuiz] = [];
    localStorage.setItem('quizAnswers', JSON.stringify(savedAnswers));
    renderQuiz(currentQuiz);
    scoreDisplay.textContent = '';
  });

});
