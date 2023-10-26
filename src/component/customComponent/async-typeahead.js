import React from 'react'
import { AsyncTypeahead } from 'react-bootstrap-typeahead'

export default class TAsyncTypeahead extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      isInvalid: false,
      isValid: false,
      defaultSelected: [],
      useCache: this.props.useCache ? true : false,
      maxResults: this.props.maxResults || 50,
      keyword: '',
      options: [],
      _cache: [],
    }

    this.asyncTypeaheadRef = React.createRef()
  }

  componentDidMount() {
    if (this.props.defaultSelected) {
      this.setState({ defaultSelected: [{ key: this.props.defaultSelected }], })
    }
  }

  componentDidUpdate(props_old) {
    if (props_old.value && !this.props.value) {
      this.props.showValid ? this.setState({ isInvalid: true, isValid: false, }) : this.asyncTypeaheadRef.current.clear()
    }

    if (!props_old.defaultSelected && this.props.defaultSelected) {
      this.setState({ defaultSelected: [{ key: this.props.defaultSelected }], })
    }
  }

  _handleRequestItem = (keyword, page = 1) => this.props.onRequestItem ? this.props.onRequestItem(keyword, page, this.state.maxResults) : { options: [], total: 0 }

  _onPaginate = (e, shownResults) => {
    const { keyword, _cache, } = this.state

    if (_cache[keyword].options.length > shownResults || _cache[keyword].options.length === _cache[keyword].total) return

    this.setState({
      isLoading: true,
    }, async () => {
      const page = _cache[keyword].page + 1

      const resp = await this._handleRequestItem(keyword, page)

      const options = _cache[keyword].options.concat(resp.options)

      this.setState(state => {
        state._cache[keyword] = { ..._cache[keyword], options, page }

        return {
          isLoading: false,
          options: resp.options,
          _cache: state._cache,
        }
      })
    })
  }

  _onSearch = keyword => {
    const { _cache, useCache, } = this.state

    if (useCache && _cache[keyword]) {
      this.setState({ options: _cache[keyword].options })
      return
    }

    this.setState({
      isLoading: true,
    }, async () => {
      const resp = await this._handleRequestItem(keyword)

      this.setState(state => {
        state._cache[keyword] = { ...resp, page: 1 }

        return {
          isLoading: false,
          options: resp.options,
          _cache: state._cache,
        }
      })
    })
  }

  _onChange = (e) => {
    if (this.props.showValid) {
      this.setState({
        isInvalid: e.length ? false : true,
        isValid: e.length ? true : false,
      })
    } else if (!e.length) {
      this.asyncTypeaheadRef.current.clear()
    }

    this.props.onChange(e)
  }

  _renderItem = (item, props, idx) => this.props.renderItem ? this.props.renderItem(item, props, idx) : <div key={idx}>{item.key}</div>

  render() {
    let { setProps } = this.props

    let props = {
      id: "ta-async-typeahead",
      labelKey: "key",
      isLoading: this.state.isLoading,
      isInvalid: this.state.isInvalid,
      isValid: this.state.isValid,
      className: this.props.className || '',
      maxResults: this.state.maxResults - 1,
      minLength: this.props.minLength || 2,
      options: this.state.options,
      onChange: this._onChange,
      onInputChange: (keyword) => this.setState({ keyword }),
      onPaginate: this._onPaginate,
      onSearch: this._onSearch,
      paginate: true,
      paginationText: this.props.paginationText || 'แสดงผลลัพธ์เพิ่ม..',
      placeholder: this.props.placeholder || 'ค้นหา..',
      renderMenuItemChildren: this._renderItem,
      ref: this.asyncTypeaheadRef,
      useCache: this.state.useCache,
      ...setProps,
    }

    if (this.props.defaultSelected) {
      return this.state.defaultSelected.length ? (
        <AsyncTypeahead {...props} defaultSelected={this.state.defaultSelected} />
      ) : (
        <input type="text" className="form-control" autoComplete="off" placeholder={this.props.placeholder || 'ค้นหา..'} />
      )
    } else {
      return <AsyncTypeahead {...props} />
    }
  }
}