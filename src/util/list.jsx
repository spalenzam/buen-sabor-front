import React, { useState } from "react";
import { useEffect } from "react";
import { Col, Row } from 'react-bootstrap';

export default function (props){
    const [state]=useState({
        optionList:[],
        actualForm:{},
    });


    const [,setRefreshs]=useState(0);
    const reRender=()=>setRefreshs(Math.random());
    useEffect(()=>{
        if (!props.input.value){
            state.optionList=[];
        }
        
        else state.optionList=JSON.parse(JSON.stringify(props.input.value));
        reRender();
    },[JSON.stringify(props.input.value)])
    function AddToList(){
        if (typeof props.compare=="function"){
            const elem=state.optionList.find((elem)=>props.compare(elem,state.actualForm));
            if (elem){
               return;
            }
        }   
        state.optionList.push(state.actualForm);
        state.actualForm={};
        createValue();
    }
    function createValue(){
        props.input.onChange(JSON.parse(JSON.stringify(state.optionList)));
    }
    function valid(){
        for (const key in props.options){
            const option = props.options[key];
            if (option.required && !state.actualForm[key]){
                return false;
            }
        }
        return true;
    }
    function onChange(attr,value){ 
        state.actualForm[attr]=value;
        let activar = true
        reRender();
        if (props.options && typeof props.options[attr].onChange=="function"){
            props.options[attr].onChange(value,{...state.actualForm})
        }
    }
    function getShowValue(elem,attr){
        if (props.options[attr].showAttr && elem){
            return (elem[props.options[attr].showAttr])+""
        }
        else {
            return (elem)+"";
        }
    }

    return (
        <>
          
           {!props.renderInput && <Row className="listAddPro">

                {Object.keys(props.options).map((key,index)=>{
                    const option=props.options[key];
                    const inputProps=option.props || {};
                    const Component=option.component ;
                    
                    if (Component)return (<Col md={6} sm={12} key={index}>
                        <Component 
                            input={{
                                onChange:(value)=>onChange(key,value),
                                value:state.actualForm[key],
                            }}
                            {...inputProps}
                        />
                    </Col>)
                    else return (
                        <Col md={6} sm={12} key={index}>
                            <label>{option.caption || key}</label>
                            <input 
                            {...option.input} 
                            value={state.actualForm[key] || ""} 
                            onChange={(e)=>onChange(key,e.target.value)}/>
                        </Col>
                    )
                })}
                        <Col lg={3}>
                            <button type="button" disabled={!valid()} className="btn btn-primary plus" onClick={AddToList}>
                                <i className="fa fa-plus"></i>
                            </button>
                        </Col>
            </Row>
            }
             {props.renderInput && <div>
                {props.renderInput (state.actualForm, onChange, AddToList, props.input.value)}

            </div>
            }
            {!props.renderRows && state.optionList.map((option,index)=>{
                return (
                    <Row className="li-style ">
                        <Col md={12}>
                            {Object.keys(props.options).map(key=>{
                                return (
                                <li>
                                    {getShowValue(option[key],key)}
                                </li>)
                            })}
                            
                            <button type="button" onClick={()=>{state.optionList.splice(index,1);createValue()}}>
                            <i className="fa fa-times"></i>
                            </button>
                        </Col>
                    </Row>
            )})}
            {props.renderRows && props.renderRows(
                state.optionList,
                (index)=>{state.optionList.splice(index,1);createValue()},
                (index)=>{state.actualForm=state.optionList.splice(index,1)[0];createValue()}

            )
            }
           
           
        </>
    )
}