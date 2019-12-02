import React from 'react';
import { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import { ONSDateInput } from './ONSDateInput';
import DatePicker from 'react-datepicker';

describe("ONS Data Input Test", () => {
    Enzyme.configure({ adapter: new Adapter() });

    const Props = {
    
    }
    
    let x: any

    const dateInputProps = {
        label: 'Date Input',
        onChange: jest.fn(),
        date: null
    };

    const undefinedDateInputProps = {
        label: 'undefined Date Input',
        onChange: undefined,
        date: new Date()
    };

    function wrapper(render: any, props: any) {
        return render(
            <ONSDateInput
                label={props.label}
                onChange={props.onChange}
                date={props.date}
            /> 
        
            
        )
    }

    it("should render correctly", () => expect(wrapper(shallow, Props).exists()).toEqual(true));

    // TODO: can't get change event to work on Date input
    it.skip('simulates change events', () => {
        wrapper(mount, dateInputProps).find(DatePicker).simulate('change');
        expect(dateInputProps.onChange).toHaveBeenCalled()

        wrapper(mount, undefinedDateInputProps).find('ONSDateInput').simulate('change');
        expect(undefinedDateInputProps.onChange).toBeUndefined()
    });

    // it('clicks on the onclick', () => {

    // }
    // )

    // it('matches snapshot', () => {
    //     expect(wrapper(mount, checkboxProps)).toMatchSnapshot()
    // });
});
