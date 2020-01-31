let gameCount = true

$(document).ready(function () {
  $('#results-display').hide()
  $('#main-game').hide()
  $('#previousQuestion').hide()
  $('#nextQuestion').hide()
  $('#finish').hide()
  // $("#showButts").hide()
  $('.answer').on('click', function () {
    $('#showButts').show()
  })
})
let questionIndex = 0
let gameTimer
let quizTime = 60 // seconds
const questionObject = {
  response_code: 0,
  results: [
    {
      category: 'Science: Computers',
      type: 'multiple',
      difficulty: 'easy',
      question: 'When Gmail first launched, how much storage did it provide for your email?',
      correct_answer: '1GB',
      incorrect_answers: [
        '512MB',
        '5GB',
        'Unlimited'
      ]
    },
    {
      category: 'Science: Computers',
      type: 'multiple',
      difficulty: 'easy',
      question: 'The programming language &#039;Swift&#039; was created to replace what other programming language?',
      correct_answer: 'Objective-C',
      incorrect_answers: [
        'C#',
        'Ruby',
        'C++'
      ]
    },
    {
      category: 'Science: Computers',
      type: 'multiple',
      difficulty: 'hard',
      question: 'How many Hz does the video standard PAL support?',
      correct_answer: '50',
      incorrect_answers: [
        '59',
        '60',
        '25'
      ]
    },
    {
      category: 'Science: Computers',
      type: 'multiple',
      difficulty: 'medium',
      question: 'Nvidia&#039;s headquarters are based in which Silicon Valley city?',
      correct_answer: 'Santa Clara',
      incorrect_answers: [
        'Palo Alto',
        'Cupertino',
        'Mountain View'
      ]
    },
    {
      category: 'Science: Computers',
      type: 'multiple',
      difficulty: 'easy',
      question: 'How many kilobytes in one gigabyte?',
      correct_answer: '1000000',
      incorrect_answers: [
        '1024',
        '1000',
        '1048576'
      ]
    },
    {
      category: 'Science: Computers',
      type: 'multiple',
      difficulty: 'easy',
      question: 'On Twitter, what is the character limit for a Tweet?',
      correct_answer: '140',
      incorrect_answers: [
        '120',
        '160',
        '100'
      ]
    },
    {
      category: 'Science: Computers',
      type: 'multiple',
      difficulty: 'medium',
      question: '.at is the top-level domain for what country?',
      correct_answer: 'Austria',
      incorrect_answers: [
        'Argentina',
        'Australia',
        'Angola'
      ]
    },
    {
      category: 'Science: Computers',
      type: 'multiple',
      difficulty: 'hard',
      question: 'Which data structure does FILO apply to?',
      correct_answer: 'Stack',
      incorrect_answers: [
        'Queue',
        'Heap',
        'Tree'
      ]
    },
    {
      category: 'Science: Computers',
      type: 'multiple',
      difficulty: 'hard',
      question: 'America Online (AOL) started out as which of these online service providers?',
      correct_answer: 'Quantum Link',
      incorrect_answers: [
        'CompuServe',
        'Prodigy',
        'GEnie'
      ]
    },
    {
      category: 'Science: Computers',
      type: 'multiple',
      difficulty: 'hard',
      question: 'What was the first company to use the term &quot;Golden Master&quot;?',
      correct_answer: 'Apple',
      incorrect_answers: [
        'IBM',
        'Microsoft',
        'Google'
      ]
    }
  ]
}

function populateQuestionDetails () {
  $('#answer-response').hide()
  $('#question-container').empty()
  $('#answers-container').empty()
  $('#answer-response').empty()
  $('#question-container').html(questionObject.results[questionIndex].question)
  let quesAnswers = questionObject.results[questionIndex].incorrect_answers
  quesAnswers.length = questionObject.results[questionIndex].incorrect_answers.length
  quesAnswers.push(questionObject.results[questionIndex].correct_answer)
  quesAnswers = shuffle(quesAnswers)
  for (let i = 0; i < quesAnswers.length; i++) {
    $('#answers-container').append('<div class="answer">' + quesAnswers[i] + '</div>')
  }
  renderQuestionControls()
}

function renderQuestionControls () {
  if (questionIndex === 0) {
    $('#previousQuestion').hide()
    $('#nextQuestion').show()
  } else if (questionIndex === questionObject.length - 1) {
    $('#previousQuestion').show()
    $('#nextQuestion').hide()
    $('#finish').show()
  } else {
    $('#previousQuestion').show()
    $('#nextQuestion').show()
  }
  // console.log("questionIndex: " + questionIndex + " length: " + questionObject.length);
}

function getPreviousQuestion () {
  questionIndex--
  populateQuestionDetails()
}

function getNextQuestion () {
  questionIndex++
  populateQuestionDetails()
}

function processAnswer () {
  const selectedAnsID = parseInt($(this).attr('data-content'))
  const correctAnsID = questionObject[questionIndex].correct

  if (selectedAnsID === correctAnsID) {
    $('#answer-response').html('<h4>Correct!</h4>')
  } else {
    quizTime = quizTime - 5
    $('#answer-response').html("<h4>Sorry that's not right.<b> Lose 5 seconds...</h4>")
  }

  // $("#answer-response").append(questionObject[questionIndex].reason);
  $('#answer-response').show()

  questionObject[questionIndex].selected = selectedAnsID

  // console.log(questionObject[questionIndex].selected);
}

function countDown () {
  quizTime--
  $('#timeContainer').html(quizTime)
  if (quizTime === 0) {
    clearInterval(gameTimer)
    if (gameCount) {
      endGame()
    }
  }
}

$('#start').on('click', function () {
  $('#splash-screen').hide()
  $('#main-game').show()
  gameTimer = setInterval(countDown, 1000)
  questionIndex = 0
  populateQuestionDetails(questionIndex)
})

$(document).on('click', '.answer', processAnswer)
$('#previousQuestion').on('click', getPreviousQuestion)
$('#nextQuestion').on('click', getNextQuestion)
$('#finish').on('click', endGame)

function endGame () {
  clearInterval(gameTimer)
  $('#main-game').hide()
  $('.jumbotron').hide()

  processResults()
  $('#results-display').show()

  const yourTime = parseInt(quizTime)
  console.log('Completion Time: ' + yourTime)
  $('#yourTime').text(yourTime)
  $('#yourTimeModal').text(yourTime)

  const highScore = yourTime // change this to yourScore
  const score = JSON.parse(localStorage.getItem('score')) || []

  // const renderscore = _ => {
  //   document.getElementById('score').innerHTML = ''
  //   for (let i = 0; i < score.length; i++) {
  //     const itemElem = document.createElement('li')
  //     // itemElem.className = score[i].score ? 'complete' : 'incomplete'

  //     itemElem.innerHTML = `Name: <b>${score[i].text}</b>  -  Highscore: <b>${score[i].highScore}</b>`
  //     document.getElementById('score').append(itemElem)
  //   }
  // }

  document.getElementById('addItem').addEventListener('click', event => {
    event.preventDefault()
    score.push({
      text: document.getElementById('item').value,
      highScore: highScore
    })
    localStorage.setItem('score', JSON.stringify(score))
    renderscore()
    document.getElementById('item').value = ''
  })
  renderscore()
}

$('#restart').on('click', function () {
  gameCount = true
  window.location.reload()
})

function processResults () {
  let status
  let correct = 0
  let incorrect = 0
  // let score = 0;

  for (let i = 0; i < questionObject.length; i++) {
    if (questionObject[i].correct === questionObject[i].selected) {
      correct++
      status = 'Correct!'
    } else {
      incorrect++
      status = 'Incorrect!'
    }
    if (questionObject[i].selected !== null) {
      let selectedText = 'NA'
      for (let j = 0; j < questionObject[i].answers.length; j++) {
        if (questionObject[i].answers[j].ansID === questionObject[i].selected) {
          selectedText = questionObject[i].answers[j].answer
          break
        }
      }
    } else {
      selectedText = '--'
    }
    let correctText = 'NA'
    for (let k = 0; k < questionObject[i].answers.length; k++) {
      if (questionObject[i].answers[k].ansID === questionObject[i].correct) {
        correctText = questionObject[i].answers[k].answer
        break
      }
    }

    $('#result-rows').append('<tr><td>' + questionObject[i].question + '</td><td>' + selectedText + '</td><td>' + correctText + '</td><td>' + status + '</td></tr>')

    // <b> Your Time: </div></b>
  }
}
