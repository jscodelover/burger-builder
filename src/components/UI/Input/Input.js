import React from 'react';

import classes from './Input.css';

const input = props => {
    let inputElement = null;
    const inputClass = [classes.InputElement];

    if(props.isValid && props.shouldValidate && props.touched)
        inputClass.push(classes.inValid);

    switch(props.ElementType)
    {
        case ('input') : inputElement =<input className={inputClass.join(' ')} {...props.ElementConfig} value={props.Value} onChange={props.changed} />
                         break;
        case ('select') : inputElement =<select className={inputClass.join(' ')} value={props.Value} onChange={props.changed} >
                                          {
                                              props.ElementConfig.options.map(option => {
                                                  return <option key={option.value} value={option.value}>{option.displayValue}</option>
                                              })
                                          }
                                        </select>
                          break;                  
        default : inputElement = <input className={inputClass.join(' ')} {...props.ElementConfig} value={props.Value} onChange={props.changed} />                                
    }
    return (
                <div className={classes.Input}>
                    {inputElement}
                </div>    
    );
}

export default input;