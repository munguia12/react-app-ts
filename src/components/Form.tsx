import useNewSubForm from '../hooks/useNewSubForms'
import {Sub} from '../types'

interface FormProps {
  onNewSub: (newSub: Sub) => void
}

const Form = ({ onNewSub }: FormProps) => {

  // const [inputValues, setInputValues] = useState<FormState["inputValues"]>(INITIAL_STATE)
  const [inputValues, dispatch] = useNewSubForm()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onNewSub(inputValues)
    dispatch({
      type: 'clear'
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target
    dispatch({
      type: 'change_value',
      payload:{
        inputName: name,
        inputValue: value
      }
    })
  }

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={inputValues.nick} name='nick' placeholder='Nick' />
        <input type="number" onChange={handleChange} value={inputValues.subMonths} name='subMonths' placeholder='SubMonths' />
        <input type="text" onChange={handleChange} value={inputValues.avatar} name='avatar' placeholder='Avatar' />
        <textarea onChange={handleChange} value={inputValues.description} name='description' placeholder='Description' />
        <button>Save new Sub!</button>
      </form>
    </div>
  )
}

export default Form