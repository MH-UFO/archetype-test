import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import NewQuestion from "./Question"
import Results from "./Results"
import '../styles/Test.css';
import StarryBackground from './StarryBackground';

function GetAllQuestions(props) {
  const navigate = useNavigate()
  const [questionIndex, setQuestionIndex] = useState(69)
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([])
  const progress = questions.length > 0 ? ((questionIndex) / questions.length) * 100 : 0;

  useEffect(() => {
    window.onbeforeunload = function () {
      return "";
    };
    return () => {
      window.onbeforeunload = null;
    }
  }, [])

  useEffect(() => {
    getQuestions();
  }, []);

  async function getQuestions() {
    try {
      let allQuestions = await axios.get(`http://localhost:3000/api/archetype_test/${props.gender}`);
      setQuestions(allQuestions.data);
    } catch (err) {
      console.log("error", err.message);
    }
  }

  function nextQuestion(id, answer, type) {
    setAnswers((prevValue) => {
      return [
        ...prevValue,
        { id: id, answer: answer, answer_category: type }
      ]
    })
    setQuestionIndex(questionIndex + 1)
  }

  function handleLeavingPage(e) {
    e.preventDefault()
    if (window.confirm('آیا مطمئنید که میخواهید خارج شوید؟')) {
      navigate("/")
    }
  }
  console.log(answers)

  // Show results when test is completed
  if (questions.length > 0 && questionIndex >= questions.length) {
    return <Results answers={answers} gender={props.gender} />;
  }

  return (
    <div className="test-page">
      <Link onClick={handleLeavingPage} className="btn btn-danger leave-exam-button" to="/">{questionIndex >= questions.length ? "خروج" : " خروج از آزمون"}</Link>
      <div style={{ zIndex: "0" }} ><StarryBackground /></div>
      <div className="test-box">
        {(questions.length > 0 && questionIndex < questions.length) ? (
          <>
            <p className="hint">برای گرفتن نتیجه بهتر لطفا سوالات را در کمتر از 15 ثانیه جواب بدهید.به طوری که اولین جوابی که به ذهنتان آمد را انتخاب کنید</p>
            <p className="progress-text">
              سوال {questionIndex + 1} از {questions.length}
            </p>
            <div className="progress-bar-container">
              <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <NewQuestion
              key={questions[questionIndex].id}
              id={questions[questionIndex].id}
              question={questions[questionIndex].question}
              onClick={nextQuestion}
              type={questions[questionIndex].question_category}
              lastQuestion={questionIndex >= questions.length - 1 ? true : false}
            />
          </>
        ) : <div>خطا در دریافت سوالات. لطفن صفحه را رفرش کنید</div>}
      </div>
    </div>
  )
}


export default GetAllQuestions