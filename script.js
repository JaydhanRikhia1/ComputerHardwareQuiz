document.addEventListener('DOMContentLoaded', () => {
    nextButton.classList.add('hide');
  });
  
  const startButton = document.getElementById('start-btn');
  const nextButton = document.getElementById('next-btn');
  const questionContainerElement = document.getElementById('question-container');
  const questionElement = document.getElementById('question');
  const answerButtonsElement = document.getElementById('answer-buttons');
  const quizAppElement = document.getElementById('quiz-app');
  const resultsElement = document.createElement('div');
  resultsElement.setAttribute('id', 'results');
  resultsElement.classList.add('results', 'hide');
  quizAppElement.appendChild(resultsElement);
  
  let shuffledQuestions, currentQuestionIndex;
  let score = 0;
  
  startButton.addEventListener('click', startGame);
  nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
  });
  function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
  }
  
  function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  }
  
  function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
    }
  
  function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', () => selectAnswer(button));
        answerButtonsElement.appendChild(button);
    });
  }
  
  function selectAnswer(selectedButton) {
    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
        setStatusClass(button, button.dataset.correct);
    });
  
    const correct = selectedButton.dataset.correct;
    if (correct) {
        score++;
    }
    setStatusClass(selectedButton, correct);
  
    setTimeout(() => {
        if (shuffledQuestions.length > currentQuestionIndex + 1) {
            nextButton.classList.remove('hide');
        } else {
            concludeQuiz();
        }
    }, 1000); // Adjust delay as needed
   
  }
  
  function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
    }
  
  function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
  }
  
  function concludeQuiz() {
    questionContainerElement.classList.add('hide');
    nextButton.classList.add('hide');
  
    resultsElement.classList.remove('hide');
    resultsElement.innerHTML = `
        <h2>Quiz Completed!</h2>
        <p>Your score: ${score} out of ${shuffledQuestions.length}</p>
        <button onclick="restartQuiz()">Restart Quiz</button>
    `;
    quizAppElement.appendChild(resultsElement);
  }
  
  function restartQuiz() {
    resultsElement.classList.add('hide');
    score = 0;
    currentQuestionIndex = 0;
    startGame();
  }
  const questions = [
    {
        question: "Which of the following is the brain of the computer, responsible for processing instructions and data?",
        answers: [
            { text: "Motherboard", correct: false },
            { text: "Central Processing Unit (CPU)", correct: true },
            { text: "Random Access Memory (RAM)", correct: false },
            { text: "Hard Disk Drive (HDD", correct: false }
        ]
    },
    {
        question: "What type of memory is volatile, meaning data is lost when the computer is turned off?",
        answers: [
            { text: "Read-Only Memory (ROM)", correct: false },
            { text: "Solid State Drive (SSD", correct: false },
            { text: "Hard Disk Drive (HDD)", correct: false },
            { text: "Random Access Memory (RAM)", correct: true }
        ]
    },
    {
        question: "What device allows you to see the output generated by the computer?",
        answers: [
            { text: "Keyboard", correct: false },
            { text: "Printer", correct: false },
            { text: "Monitor", correct: true },
            { text: "Scanner", correct: false }
        ]
    },
    {
        question: "What is the main function of a graphics processing unit (GPU)?",
        answers: [
            { text: "Strong Data", correct: false },
            { text: "Processing complex graphics and video", correct: true },
            { text: "Connecting to the internet", correct: false },
            { text: "Managing system files", correct: false }
        ]
    },
    {
        question: "What type of storage device uses a laser to read and write data",
        answers: [
            { text: "Solid State Drive (SSD)", correct: false },
            { text: "Optical Drive", correct: true },
            { text: "Hard Disk Drive (HDD)", correct: false },
            { text: "Flash Drive", correct: false }
        ]
    },
    {
        question: "What is the Purpose of a Sound Card?",
        answers: [
            { text: "Enhancing and managing computer sound", correct: true },
            { text: "Processing video data", correct: false },
            { text: "Connecting to External Devices", correct: false },
            { text: "Cooling Down the Computer", correct: false }
        ]
    },
    {
      question: "What component provides power to all the other components in the computer?",
        answers: [
            { text: "Motherboard", correct: false },
            { text: "Central Processing Unit(CPU)", correct: false },
            { text: "Power Supply Unit (PSU)", correct: true },
            { text: "Graphics Processing Unit(GPU)", correct: false }
        ]
    },
    {
        question: "Which of the Following is an Example of an Input Device?",
        answers: [
            { text: "Monitor", correct: false },
            { text: "Printer", correct: false },
            { text: "Keyboard", correct: true },
            { text: "Speaker", correct: false }
        ]
    },
    {
        question: "What Type of RAM Offers Faster Data Access Speeds But Is More Expensive?",
        answers: [
            { text: "Dynamic Random Access", correct: false },
            { text: "Static Random-Access Memory (DRAM)", correct: true },
            { text: "Read-Only Memory", correct: false },
            { text: "Flash Memory", correct: false }
            ]
    },
    {
        question: "How Many Bits Make Up One Byte of Data?",
        answers: [
            { text: "16 bits", correct: false },
            { text: "8 bits", correct: false },
            { text: "4 bits", correct: true },
            { text: "32 bits", correct: false }
        ]
    }
  ];