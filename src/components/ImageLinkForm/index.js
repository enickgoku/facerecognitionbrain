import './imagelinkform.css'

const ImageLinkForm = ({ formData, onInputChange, onButtonSubmit }) => {
  const { input } = formData

  return (
    <div>
      <p className="f3 pa3">
        This Magic Brain will detect faces in your pictures. Give it a try.
      </p>
      <div className="center">
        <div className="center form pa4 br3 shawdow-5">
          <input
            className="f4 pa2 w-70 center"
            type="text"
            onChange={onInputChange}
            name="input"
            value={input}
          />
          <button
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
            onClick={onButtonSubmit}
            type="submit"
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  )
}

export default ImageLinkForm
