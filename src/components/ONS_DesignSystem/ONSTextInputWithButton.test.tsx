import React from "react";
import Enzyme, {mount, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {ONSTextInputWithButton} from "./ONSTextInputWithButton";
import sinon from "sinon";

describe("ONS Text Input With Button Test", () => {
    Enzyme.configure({adapter: new Adapter()});

    const props = {
        // Input Props
        labelID: "label_id",
        inputLabel: "input_label",
        handleInputChange: jest.fn(),
        inputValue: "input_value",
        // Button Props
        buttonID: "btn_id",
        buttonLabel: "btn_label",
        onButtonClick: sinon.spy(),
        primaryButton: true
    };

    const secondaryButtonProps = {
        // Input Props
        labelID: "label_id",
        inputLabel: "input_label",
        handleInputChange: jest.fn(),
        inputValue: "input_value",
        // Button Props
        buttonID: "btn_id",
        buttonLabel: "btn_label",
        onButtonClick: sinon.spy(),
        primaryButton: false
    };

    function wrapper(render: any, props: any) {
        return render(
            <ONSTextInputWithButton labelID={props.labelID}
                                    inputLabel={props.inputLabel}
                                    handleInputChange={props.handleInputChange}
                                    inputValue={props.inputValue}
                                    buttonID={props.buttonID}
                                    buttonLabel={props.buttonLabel}
                                    onButtonClick={props.onButtonClick}
                                    primaryButton={props.primaryButton}/>
        );
    }

    it("matches Snapshot", () => {
        expect(wrapper(shallow, props)).toMatchSnapshot()
    });

    it("should render correctly", () => expect(wrapper(shallow, props).exists()).toEqual(true));

    it("should render with the correct label", () => {
        expect(wrapper(mount, props).find("ONSTextInputWithButton").getElement().props.inputLabel).toEqual(props.inputLabel);
    });

    it("simulates change events", () => {
        //defined
        wrapper(mount, props).find("input").simulate("change");
        expect(props.handleInputChange).toHaveBeenCalled();
    });

    it("simulates click events", () => {
        wrapper(mount, props).find("button.btn").simulate("click");
        expect(props.onButtonClick).toHaveProperty("callCount", 1);
    });

    it("displays secondary button", () => {
        expect(wrapper(mount, secondaryButtonProps).find("button").hasClass("btn--secondary")).toEqual(true);
    });


});