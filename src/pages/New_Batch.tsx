import React, {ChangeEvent, Component} from "react";
import {ONSSelect} from "../components/ONS_DesignSystem/ONSSelect";
import {ONSSubmitButton} from "../components/ONS_DesignSystem/ONSSubmitButton";
import {batches, monthNames, months, quarters, years} from "../utilities/Common_Functions";
import {createNewBatch} from "../utilities/http";
import {ONSPanel} from "../components/ONS_DesignSystem/ONSPanel";
import DocumentTitle from "react-document-title";
import {Link} from "react-router-dom";

interface Panel {
    label: string,
    visible: boolean
    status: string
}

interface State {
    batchType: string
    year: string
    period: string
    submit: boolean
    inputError: boolean
    panel: Panel
    errorGone: boolean
}

export class New_Batch extends Component <{}, State> {
    displayName = New_Batch.name;

    constructor(props: any) {
        super(props);
        this.state = {
            batchType: "",
            year: "",
            period: "",
            inputError: false,
            submit: false,
            panel: {
                label: "",
                visible: false,
                status: ""
            },
            errorGone: false
        };
    }

    error = false;

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.preventDefault();
        this.setState({submit: true});
        //setting up for the panel error, if submit === true then there is at least one empty field and submit has been clicked, else redirect to view batch
        if (this.state.batchType === "" || this.state.year === "" || (this.state.batchType !== "yearly" && this.state.period === "")) this.error = true;
        else {
            let periodName: String;
            if (this.state.batchType === "monthly") periodName = monthNames[+this.state.period].substring(0, 3);
            else if (this.state.batchType === "quarterly") periodName = this.state.period;
            else periodName = "JD";

            let batch_id = String(periodName + String(this.state.year));

            console.log(batch_id);
            console.log("batch type : " + this.state.batchType);
            console.log("batch type : " + this.state.year);
            if (this.state.batchType !== "yearly") console.log("batch type : s" + this.state.period);

            createNewBatch(this.state.batchType, this.state.year, this.state.period, "")
                .then(r => {
                    console.log(r);

                    if (r.status === "ERROR") {
                        this.setState({
                            panel: {
                                label: r.errorMessage,
                                visible: true,
                                status: "error"
                            }
                        });
                    } else {
                        this.setState({
                            panel: {
                                label: "Created new Batch ID ",
                                visible: true,
                                status: "info"
                            }
                        });
                        // redirect to Manage batch Page
                        window.location.href = "/manage-batch/" + this.state.batchType + "/" + this.state.year + "/" + this.state.period;
                    }
                })
                .catch(error => console.log(error));
        }

        if (this.state.batchType === "yearly") this.setState({period: ""});
        if (this.state.errorGone === false) this.setState({inputError: true});
        else this.setState({inputError: false});
    };

    handleBatchTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        this.setState({batchType: e.target.value, period: ""});
        this.errorGone("Batch");
    };

    handleYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
        this.setState({year: e.target.value});
        this.errorGone("Year");
    };

    handlePeriodChange = (e: ChangeEvent<HTMLSelectElement>) => {
        this.setState({period: e.target.value});
        this.errorGone("Period");
    };

    errorGone = (value: string) => {
        console.log(value);
        console.log(this.state.batchType);
        console.log(this.state.year);
        console.log(this.state.period);
        //batch
        if (value === "Batch")
            if (this.state.year !== "" && (this.state.batchType !== "yearly" && this.state.period !== "")) {
                this.setState({inputError: false, errorGone: true});
            }
        //Year
        if (value === "Year")
            if (this.state.batchType !== "" && this.state.batchType === "yearly") this.setState({
                inputError: false,
                errorGone: true
            });
            else if (this.state.batchType !== "yearly" && this.state.period !== "") this.setState({
                inputError: false,
                errorGone: true
            });
        //Period
        if (value === "Period")
            if (this.state.batchType !== "" && this.state.year !== "") this.setState({
                inputError: false,
                errorGone: true
            });
    };

    render() {
        return (
            <DocumentTitle title='LFS: New Batch'>
                <div className="container">
                    {
                        this.state.panel.visible &&
                        <>
                            <ONSPanel label={this.state.panel.label} hidden={!this.state.panel.visible}
                                      status={this.state.panel.status}>
                                {
                                    this.state.panel.label.includes("already exists") ?
                                        <p>{this.state.panel.label + ", "}
                                            <Link
                                                to={"manage-batch/" + this.state.batchType + "/" + this.state.year + "/" + this.state.period}>
                                                go to existing Batch
                                            </Link>
                                        </p>
                                        :
                                        <p>{this.state.panel.label}</p>
                                }
                            </ONSPanel>
                            <br/>
                        </>
                    }
                    {(this.state.inputError) &&
                    <div>
                        <div className="panel panel--error">
                            <div className="panel__header">
                                <h1 className="panel__title u-fs-r--b">This page has errors</h1>
                            </div>
                            <div className="panel__body">
                                <ul className="list list--bare">
                                    {(this.state.batchType === "") &&
                                    <li className="list__item ">
                                        <p className="list__link js-inpagelink">
                                            Please select a Batch Type.
                                        </p>
                                    </li>
                                    }
                                    {(this.state.year === "") &&
                                    <li className="list__item ">
                                        <p className="list__link js-inpagelink">
                                            Please select a Year.
                                        </p>
                                    </li>
                                    }
                                    {((this.state.batchType !== "yearly" && this.state.batchType !== "") && this.state.period === "") &&
                                    <li className="list__item ">
                                        <p className="list__link js-inpagelink">
                                            Please select a Period. {this.state.period}
                                        </p>
                                    </li>
                                    }
                                </ul>
                            </div>
                        </div>
                        <br/>
                    </div>
                    }
                    <form onSubmit={this.handleSubmit}>
                        <div style={{maxWidth: "351px"}}>
                            <ONSSelect id="batch" label="Batch Type" value="batch" options={batches}
                                       onChange={this.handleBatchTypeChange}/>
                            <ONSSelect id="year" label="Year" value="year" options={years()}
                                       onChange={this.handleYearChange}/>
                            {(this.state.batchType === "monthly") &&
                            <ONSSelect id="period" label="Period" value="period" options={months()}
                                       onChange={this.handlePeriodChange}/>
                            }
                            {(this.state.batchType === "quarterly") &&
                            <ONSSelect id="period" label="Period" value="period" options={quarters}
                                       onChange={this.handlePeriodChange}/>
                            }
                            <ONSSubmitButton id="newBatchSubmit" label="Submit" primary={true} small={false}/>
                        </div>
                    </form>
                </div>
            </DocumentTitle>
        );
    }
}
