import React, {ChangeEvent, Component, Fragment} from "react";
import {ONSAccordionTable} from "../ONS_DesignSystem/ONSAccordionTable";
import {VARIABLE_DEFINITION_HEADERS} from "../../utilities/Headers";
import DocumentTitle from "react-document-title";
import dateFormatter from "dayjs";
import {getVariableDefinitions} from "../../utilities/http";
import {ONSTextInput} from "../ONS_DesignSystem/ONSTextInput";
import {ONSButton} from "../ONS_DesignSystem/ONSButton";
import {isDevEnv} from "../../utilities/Common_Functions";
// Useful lodash cheat sheet:  https://devhints.io/lodash
import lodash from "lodash";
import uuid from "uuid/v4";

interface Props {
}

interface State {
    data: any[]
    filteredData: any[]
    search: string
    noDataMessage: string
}

interface VariableDefinitionTableRow {
    variable: string
    description: {String: string, Valid: boolean}
    label: {String: string, Valid: boolean}
    type: string
    validFrom: Date
    length: number
    precision: number
    alias: {String: string, Valid: boolean}
    editable: boolean
    imputation: boolean
    dv: boolean
}

export class VariableDefinitionTable extends Component <Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            data: [],
            filteredData: [],
            search: "",
            noDataMessage: this.noDataMessage
        };
        this.getVariableDefinitionData();
    }

    getVariableDefinitionData = () => {
        getVariableDefinitions()
            .then(r => {
                (isDevEnv() && console.log(r));
                if (r.message !== "no data found") {
                    let list: any = lodash(r)
                        .sortBy("variable")
                        .groupBy("variable")
                        .map(rows => {
                            let itemList = lodash.sortBy(rows, item => {
                                return item.validFrom;
                            }).reverse();

                            return {
                                id: itemList[0].id,
                                validFrom: itemList[0].validFrom,
                                variable: itemList[0].variable,
                                itemList
                            }
                        })
                        .value();
                    this.setState({data: list, filteredData: list});
                } else this.setState({filteredData: [], noDataMessage: "No Variable Definitions found"});
            })
            .catch(error => {
                (isDevEnv() && console.log(error));
                this.setState({filteredData: [], noDataMessage: "Error occurred while getting Variable Definitions"});
            });
    };

    noDataMessage = "No Variable Definitions matching this criteria";

    viewAll = () => {
        this.setState({filteredData: this.state.data, search: ""});
    };

    handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        let newFilteredList = lodash.filter(this.state.data, (variableRow) => variableRow.variable.includes(e.target.value.toUpperCase()));
        this.setState({search: e.target.value, filteredData: newFilteredList});
    };

    render() {
        return (
            <DocumentTitle title={"LFS View Variable Definitions"}>
                <>
                    <ONSTextInput value={this.state.search} label={"Filter by Variable Name"}
                                  onChange={this.handleSearch}/>
                    <ONSButton label={"Clear"} primary={false} small={false} field={true}
                               onClick={this.viewAll}/>
                    <br/>
                    <ONSAccordionTable data={this.state.filteredData} Row={VarDefTableRow}
                                       expandedRowEnabled={true}
                                       expandedRow={VarDefExpandedRow}
                                       expandedAdditionalRows={true}
                                       noDataMessage={this.state.noDataMessage}
                                       Headers={VARIABLE_DEFINITION_HEADERS}
                                       pagination={true}
                                       paginationSize={20}
                                       scrollable={false}/>
                </>
            </DocumentTitle>
        );
    }
}

const VarDefTableRow = (rowData: any) => {
    let row: VariableDefinitionTableRow = rowData.row.itemList[0];
    return (
        <>
            <td className="table__cell ">
                {row.variable}
            </td>
            <td className="table__cell ">
                {row.description.Valid ? row.description.String : "No Description Provided"}
            </td>
            <td className="table__cell ">
                {dateFormatter(row.validFrom).format("DD/MM/YYYY")}
            </td>
            <td className="table__cell ">
                {
                    row.editable ?
                        <img className={"loadingIcon-svg"} src={"/img/blackTrue.svg"} alt={"True Tick icon"}/>
                        :
                        <img className={"loadingIcon-svg"} src={"/img/blackFalse.svg"} alt={"False icon"}/>
                }
            </td>
            <td className="table__cell ">
                {
                    row.imputation ?
                        <img className={"loadingIcon-svg"} src={"/img/blackTrue.svg"} alt={"True Tick icon"}/>
                        :
                        <img className={"loadingIcon-svg"} src={"/img/blackFalse.svg"} alt={"False icon"}/>
                }
            </td>
            <td className="table__cell ">
                {
                    row.dv ?
                        <img className={"loadingIcon-svg"} src={"/img/blackTrue.svg"} alt={"True Tick icon"}/>
                        :
                        <img className={"loadingIcon-svg"} src={"/img/blackFalse.svg"} alt={"False icon"}/>
                }
            </td>
            <td className="table__cell ">
                {row.type}
            </td>
            <td className="table__cell ">
                {row.length}
            </td>
        </>
    );
};

const VarDefExpandedRow = (rowData: any) => {
    let rows: any[] = lodash.drop(rowData.row.itemList, 1);
    if (rows.length === 0) {
        return (
            <Fragment key={uuid()}>
                <tr className={("table__row")} style={{color: "darkblue"}}>
                    <td className="table__cell "/>
                    <td className="table__cell " colSpan={8}>
                        No Previous Metadata
                    </td>
                </tr>
            </Fragment>
        );
    }
    return rows.map((row: VariableDefinitionTableRow) => (
            <Fragment key={uuid()}>
                <tr className={("table__row")} style={{color: "darkblue"}}>
                    <td className="table__cell "/>
                    <td className="table__cell ">
                        {row.variable}
                    </td>
                    <td className="table__cell ">
                        {row.description.Valid ? row.description.String : "No Description Provided"}
                    </td>
                    <td className="table__cell ">
                        {dateFormatter(row.validFrom).format("DD/MM/YYYY")}
                    </td>
                    <td className="table__cell ">
                        {
                            row.editable ?
                                <img className={"loadingIcon-svg"} src={"/img/blueTrue.svg"} alt={"True Tick icon"}/>
                                :
                                <img className={"loadingIcon-svg"} src={"/img/blueFalse.svg"} alt={"False icon"}/>
                        }
                    </td>
                    <td className="table__cell ">
                        {
                            row.imputation ?
                                <img className={"loadingIcon-svg"} src={"/img/blueTrue.svg"} alt={"True Tick icon"}/>
                                :
                                <img className={"loadingIcon-svg"} src={"/img/blueFalse.svg"} alt={"False icon"}/>
                        }
                    </td>
                    <td className="table__cell ">
                        {
                            row.dv ?
                                <img className={"loadingIcon-svg"} src={"/img/blueTrue.svg"} alt={"True Tick icon"}/>
                                :
                                <img className={"loadingIcon-svg"} src={"/img/blueFalse.svg"} alt={"False icon"}/>
                        }
                    </td>
                    <td className="table__cell ">
                        {row.type}
                    </td>
                    <td className="table__cell ">
                        {row.length}
                    </td>
                </tr>
            </Fragment>
        )
    );

};

