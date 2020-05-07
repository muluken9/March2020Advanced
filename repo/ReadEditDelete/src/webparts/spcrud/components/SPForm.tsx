import * as React from 'react';
import { FormType } from "./ModalForm";
import { MultiLookupPicker } from "./MultiLookup";

interface SPFormProps {
  formType: FormType;
  item?: any;
}
interface SPFormState {
  Title: string;
  unitPrice: string;
  MultiLookup: any[];
  selected: string[];
}

export class SPForm extends React.Component<SPFormProps, SPFormState>{
  static data;
  constructor(props: SPFormProps){
    super(props);
    this.state = {
      Title: '',
      unitPrice: '',
      MultiLookup: [],
      selected: []
    }
    this.onChangeLookup = this.onChangeLookup.bind(this);
  }

  componentDidMount () {
    console.log('Props and State is ', this.props, this.state);
    this.setState({...this.props.item })
  } 
  

  onChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value } as SPFormState);
  }

  onChangeLookup(selected: string[]){
    console.log('Parent Selected is ', selected)
    this.setState({selected})
  }

  render() {
    console.log('Multi Lookup Value', this.state.MultiLookup);
    var se: string[] = [];
    this.state.MultiLookup.forEach(l => se.push(l.ID));
    SPForm.data = this.state;
    return (
      <>
        <div className="form-group">
          <label htmlFor="Title">Sandwitch Name</label>
          <input type="text" value={this.state.Title} onChange={this.onChange} name="Title" className="form-control" placeholder="Sandwitch Name" />
        </div>
        <div className="form-group">
          <label htmlFor="unitPrice">Unit Price</label>
          <input type="number" value={this.state.unitPrice} onChange={this.onChange} name="unitPrice" className="form-control" placeholder="Sandwitch Name" />
        </div>       
        <div className="form-group">
          <label htmlFor="multiLookup">Choose Lookup</label>
          <MultiLookupPicker selected={se} onChange={this.onChangeLookup}  listName="AccordionList" />
        </div>       
      </>
    );
  }
}