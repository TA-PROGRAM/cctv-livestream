import React, { Component } from "react"
import XLSX from "xlsx"

const SheetJSFT = [
	"xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
].map(function(x) { return "." + x; }).join(",");

const make_cols = refstr => {
	let o = [], C = XLSX.utils.decode_range(refstr).e.c + 1;
	for(var i = 0; i < C; ++i) o[i] = {name:XLSX.utils.encode_col(i), key:i}
	return o;
};
class ExcelReader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      file: {},
      data: [],
      cols: [],
    }
    this.handleFile = this.handleFile.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    const files = e.target.files
    if (files && files[0]) {
      this.setState({ file: files[0] }, () => {
        this.handleFile(); // Call handleFile once the state is updated
      })
    }
  }

  handleFile() {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader()
    const rABS = !!reader.readAsBinaryString

    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target.result
      const wb = XLSX.read(bstr, {
        type: rABS ? "binary" : "array",
        bookVBA: true,
      })
      /* Get first worksheet */
      const wsname = wb.SheetNames[0]
      const ws = wb.Sheets[wsname]
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws)
      /* Update state */
      this.setState({ data: data, cols: make_cols(ws["!ref"]) }, () => {
        this.props.onFinish({
          data
        })
      })
    }

    if (rABS) {
      reader.readAsBinaryString(this.state.file)
    } else {
      reader.readAsArrayBuffer(this.state.file)
    }
  }

  render() {
    return (
      <div>
        <input
          type="file"
          className="form-control"
          id="file"
          accept={SheetJSFT}
          onChange={this.handleChange}
        />
       
      </div>
    )
  }
}

export default ExcelReader
