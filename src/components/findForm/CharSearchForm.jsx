import React from 'react';
import { useForm } from "react-hook-form";

import './charSearchForm.scss';

const CharSearchForm = () => {

    const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm();

    const onSubmit = (data) => console.log(data);
    return (
        <form className='char__search-form' onSubmit={handleSubmit(onSubmit)}>
            <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
            <div className="char__search-wrapper">
                <input {...register("name", { required: true })} />
                <button type='submit' className="button button__main" >
                    <div className="inner">find</div>
                </button>
            </div>
            {errors.name && <div className='char__search-error'>This field is required</div>}

        </form>
    );
};

export default CharSearchForm;
