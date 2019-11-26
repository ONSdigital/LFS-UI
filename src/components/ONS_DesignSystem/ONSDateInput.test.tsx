import React from 'react';
import { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import { ONSDateInput } from './ONSDateInput';
import { getDate } from 'date-fns';

describe("ONS Data Input Test", () => {
    Enzyme.configure({ adapter: new Adapter() });

    const Props = {
        label: "Input",
        onChange: "",
        date: getDate
    }

    function wrapper(render: any, props: any| null) {
        return render(
            <ONSDateInput
                label={props.label}
                onChange={props.onChange}
                date={props.date}
            /> 
        
            
        )
    }

    it("should render correctly", () => expect(wrapper(shallow, Props).exists()).toEqual(true));



})