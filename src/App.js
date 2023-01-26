/* eslint-disable */
import React, { useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import './App.css';

function App() {

  let [title,titleUpdate]=useState(['남자 코트 추천','강남 우동맛집','파이썬독학']);
  let [time,timeUpdate]=useState(['2023-01-25','2022-12-25','2022-10-15']);
  let [rank,rankUpdate] =useState(0);
  let [text, textUpdate] = useState([
    {id:1,
     title:"남자 코트 추천",
     time:"2023-01-25"
    },
    {id:2,
     title:"강남 우동맛집",
     time:"2022-12-25"
    },
    {id:3,
     title:"파이썬독학",
     time:"2022-10-15"
    }
  ]);
  let [clickId,setClickId] = useState(0);
  let [modalShow,showUpdate] = useState(false);

  function fnTitleUpdate(){
    let newData = [...text];
    newData.find((item)=>{if(item.id==1){item.title="여자 코트 추천";}})
    console.log(newData);
    textUpdate( newData );
  }

  function fnTitleSort(){
    let sortData = [...text];
    sortData.sort(item => item.title);
    let result = sortData.sort(function(a,b){
      let x = a.title.replaceAll(" ","");
      let y= b.title.replaceAll(" ","");
      if(x<y){
        return -1;
      }
      if(x>y){
        return 1;
      }
      return 0;
    })
    textUpdate( result );
  }

  function fnShowModal(){
    showUpdate(true);
  }

  function fnCloseModal(){
    showUpdate(false);
  }


  return (
    <div className="App">
      <div className="black-nav">
        <div>개발 Blog</div>
      </div>
      <button onClick={ fnTitleUpdate }>수정버튼</button>
      <button onClick={ fnTitleSort }>정렬버튼</button>
      <TextList fnShowModal={fnShowModal} text={text} setClickId={setClickId}/>
      { modalShow && <Modal text={text} clickId={clickId} fnCloseModal={fnCloseModal} /> }
    </div>
  );
}


function Modal(props){
  let text = props.text.find((item)=>{return item.id === props.clickId});
  return(
    <div className="modal" onClick={props.fnCloseModal}>
     <h2>제목</h2>
     <h2>{text.title}</h2>
     <p>날짜</p>
     <p>{text.time}</p>
     <p>상세내용</p>
    </div>
  )
}

function TextList(props){
  return(
    props.text.map(text =>(
      <div className='list' onClick={()=>{props.fnShowModal();props.setClickId(text.id);}} key={text.id} id={text.id}>
        <h3>{ text.title }</h3>
        <p>{ text.time }</p>
        <hr/>
      </div>
    ))
  )
}
export default App;
