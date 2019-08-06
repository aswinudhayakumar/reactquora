import ReactQuill from 'react-quill'
import React, { Component } from 'react'
import 'react-quill/dist/quill.snow.css'
import ReactQuillImageUploader, {
  saveImageSrc,
} from 'react-quill-image-uploader'
import './quil.css'
import {setHistory} from 'react-quill-image-uploader'

class App extends React.Component {

state = {
    quill : ''
}
  modules = {
    toolbar: {
      container: [['bold', 'italic', 'underline', 'strike'], ['image']],
      handlers: {
        image: () => {
          const { clientX, y: clientY } = window.event
          const position = { x: clientX, y: clientY } // position the plugin to show
          this.ReactQuillImageUploaderRef.toggle(position) // show or hide the plugin
          // toggle() is also ok
          // this.ReactQuillImageUploaderRef.toggle()
        },
      },
    },
  }
  componentDidMount() {
    this.quill = this.quillRef.getEditor()
    this.setState({ quill: this.quill })
 
    // add new one to history
    // from version 0.0.1
    // ReactQuillImageUploader.saveImageSrc("https://iph.href.lu/100x100")
    // from version 0.0.4
    ReactQuillImageUploader.saveImage({
      name: 'demo.jpg',
      src: 'https://iph.href.lu/100x100',
    })
 
    // remove all and add new one by the history api
 

    setHistory([{
      name: "demo.jpg",
      src: "https://iph.href.lu/100x100"
    }])
 
    // es5
    // ReactQuillImageUploader.setHistory([{
    //   name: "demo.jpg",
    //   src: "https://iph.href.lu/100x100"
    // }])
  }
 
  uploadImageCallBack = (file, base64) => {
    // check file.size
    // check file type by file.name

    console.log(base64)
 
    return new Promise((resolve, reject) => {
      // submit file to server
      let src = 'https://iph.href.lu/200x200' // demo image src
      if (base64) {
        src = base64
      }
      // upload img thing
      const uploadSuccess = false
      if (uploadSuccess) {
        // insert img into editor manually
        this.ReactQuillImageUploaderRef.insertImg(src)
 
        // return data to save to plugin history
        resolve({
          data: {
            name: file.name || '',
            link: src,
          },
        })
      } else if (!uploadSuccess) {
        // return resolve({status: 'fail'}) or reject(), plugin will warn the user to upload again, will not save in history
        // resolve({
        //   status: 'fail',
        // })
        // resolve()
        // or
        setTimeout(() => {
          return reject()
        }, 10 * 1000)
      } else {
        // return nothing, meaning that do not save anything to history or upload fail panel
        resolve()
      }
    })
  }
  render() {
    const { modules, className = '', placeholder = 'write here..' } = this.props
    const { quill = {} } = this.state
    return (
      <div>
        <ReactQuill
          ref={el => {
            this.quillRef = el
          }}
          placeholder={placeholder}
          modules={modules || this.modules}
          className={className}
        />
        <ReactQuillImageUploader
          ref={el => {
            this.ReactQuillImageUploaderRef = el
          }}
          isShowUploadFail={true} // default true, uopload fail history is hidden when false
          isShowHistory={true} // default true, history is hidden when false
          quill={this.state.quill}
          uploadCallback={this.uploadImageCallBack}
        />
      </div>
    )
  }
}

export default App