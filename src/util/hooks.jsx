import {useCallback, useState} from 'react';
import {useParams} from 'react-router-dom';

export const useInputs = (initForm) => {
    const [form, setForm] = useState(initForm);

    const onChange = useCallback((e) => {
                                     const {name, value} = e.target;
                                     setForm(form => ({ ...form, [name]:value}));
                                 }, []
    );

    const reset = useCallback(() => setForm(initForm), [initForm]);

    return [form, onChange, reset];
}


export const useCustomParam = () => {
    let _params = useParams();
    let Params = {};
    for(const [key,value] of Object.entries(_params)){
        Params[key] = value[0].toUpperCase() + value.slice(1) // 첫 문자, 대문자 치환
    }

    return Params;
}
