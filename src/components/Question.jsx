import React, { useState } from "react";

function NewQuestion(props) {
    const [answer, setAnswer] = useState("");
    const [error, setError] = useState(false);

    function formSubmit(event) {
        event.preventDefault();
        if (answer === "") {
            setError(true);
        } else {
            props.onClick(props.id, answer, props.type)
            console.log(`Selected answer: ${answer}`);
            setAnswer("")
        }
    }

    function handleAnswer(event) {
        setAnswer(event.target.value);
        setError(false);
    }


    return (
        <>
            {error === true && <p className="error-message">لطفا یک جواب را انتخاب کنید</p>}
            <form onSubmit={formSubmit}>
                <h2 className="question-text">{props.question}</h2>
                <div className="answers-container">
                    <div className="answer-button">
                        <input type="radio" value="2" id={`${props.id}-5`} checked={answer === "2"} name={props.id} onChange={handleAnswer} />
                        <label htmlFor={`${props.id}-5`}>کاملن موافقم</label>
                    </div>
                    <div className="answer-button">
                        <input type="radio" value="-2" id={`${props.id}-2`} checked={answer === "-2"} name={props.id} onChange={handleAnswer} />
                        <label htmlFor={`${props.id}-2`}>کاملن مخالفم</label>
                    </div>
                    <div className="answer-button">
                        <input type="radio" value="1" id={`${props.id}-4`} checked={answer === "1"} name={props.id} onChange={handleAnswer} />
                        <label htmlFor={`${props.id}-4`}>موافقم</label>
                    </div>

                    <div className="answer-button">
                        <input type="radio" value="-1" id={`${props.id}-1`} checked={answer === "-1"} name={props.id} onChange={handleAnswer} />
                        <label htmlFor={`${props.id}-1`}>مخالفم</label>
                    </div>
                    <div className="answer-button">
                        <input type="radio" value="0" id={`${props.id}-3`} checked={answer === "0"} name={props.id} onChange={handleAnswer} />
                        <label htmlFor={`${props.id}-3`}>اندکی موافقم</label>
                    </div>

                </div>
                <button type="submit" className="submit-button">{props.lastQuestion == true ? "پایان آزمون" : "سوال بعد"}</button>
            </form>
        </>
    );
}

export default NewQuestion;