    const menuToggle = document.getElementById('menuToggle');
  const navList = document.getElementById('navList');
  menuToggle.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen);
  });
  navList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
 
  // ---------- Acordeón de emergencias ----------
  document.querySelectorAll('.emerg-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.emerg-card').classList.toggle('open');
    });
  });
 
  // ---------- Quiz de autoevaluación ----------
  const quizData = [
    {
      question: "¿Cuál es el primer paso del método PAS ante una emergencia?",
      options: ["Socorrer de inmediato", "Proteger el área", "Llamar a la familia", "Mover a la persona"],
      correct: 1
    },
    {
      question: "Ante una quemadura leve, ¿qué debes hacer primero?",
      options: ["Aplicar hielo directo", "Poner pasta dental", "Enfriar con agua corriente tibia", "Reventar las ampollas"],
      correct: 2
    },
    {
      question: "En la maniobra de Heimlich, las compresiones se aplican:",
      options: ["En el pecho", "En el abdomen, hacia adentro y arriba", "En la espalda baja", "En el cuello"],
      correct: 1
    },
    {
      question: "En RCP, ¿cuántas compresiones se realizan antes de dar 2 respiraciones?",
      options: ["10", "15", "30", "50"],
      correct: 2
    },
    {
      question: "Ante una convulsión, ¿qué NO debes hacer?",
      options: ["Despejar el área", "Poner algo suave bajo la cabeza", "Sujetar a la persona con fuerza", "Colocarla de lado al terminar"],
      correct: 2
    }
  ];
 
  let currentQ = 0;
  let score = 0;
  let answered = false;
 
  const quizQuestion = document.getElementById('quizQuestion');
  const quizOptions = document.getElementById('quizOptions');
  const quizFeedback = document.getElementById('quizFeedback');
  const quizNext = document.getElementById('quizNext');
  const quizProgress = document.getElementById('quizProgress');
  const quizActive = document.getElementById('quizActive');
  const quizResult = document.getElementById('quizResult');
  const quizScore = document.getElementById('quizScore');
  const quizScoreMsg = document.getElementById('quizScoreMsg');
  const quizRestart = document.getElementById('quizRestart');
 
  function renderQuestion(){
    answered = false;
    quizNext.disabled = true;
    quizFeedback.textContent = '';
    const q = quizData[currentQ];
    quizProgress.textContent = `Pregunta ${currentQ + 1} de ${quizData.length}`;
    quizQuestion.textContent = q.question;
    quizOptions.innerHTML = '';
 
    q.options.forEach((opt, i) => {
      const div = document.createElement('div');
      div.className = 'quiz-option';
      div.textContent = opt;
      div.addEventListener('click', () => selectOption(i, div));
      quizOptions.appendChild(div);
    });
 
    quizNext.textContent = currentQ === quizData.length - 1 ? 'Ver resultado' : 'Siguiente';
  }
 
  function selectOption(i, el){
    if (answered) return;
    answered = true;
    const q = quizData[currentQ];
    const optionEls = quizOptions.querySelectorAll('.quiz-option');
 
    optionEls.forEach((o, idx) => {
      if (idx === q.correct) o.classList.add('correct');
      if (idx === i && i !== q.correct) o.classList.add('incorrect');
    });
 
    if (i === q.correct){
      score++;
      quizFeedback.textContent = 'Correcto.';
    } else {
      quizFeedback.textContent = 'No es correcto. Se resalta la respuesta adecuada.';
    }
    quizNext.disabled = false;
  }
 
  quizNext.addEventListener('click', () => {
    if (currentQ < quizData.length - 1){
      currentQ++;
      renderQuestion();
    } else {
      showResult();
    }
  });
 
  function showResult(){
    quizActive.classList.add('hidden');
    quizResult.classList.remove('hidden');
    quizScore.textContent = `${score}/${quizData.length}`;
    let msg = 'Sigue repasando los procedimientos básicos.';
    if (score === quizData.length) msg = 'Excelente, dominas los conceptos básicos.';
    else if (score >= quizData.length - 2) msg = 'Buen resultado, revisa los puntos que fallaste.';
    quizScoreMsg.textContent = msg;
  }
 
  quizRestart.addEventListener('click', () => {
    currentQ = 0;
    score = 0;
    quizResult.classList.add('hidden');
    quizActive.classList.remove('hidden');
    renderQuestion();
  });
 
  renderQuestion();
 
  // ---------- Formulario de contacto (sin backend) ----------
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
 
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formStatus.textContent = 'Mensaje listo para enviar (formulario de demostración, no se envían datos).';
    contactForm.reset();
  });
