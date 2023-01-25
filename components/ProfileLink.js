import axios from 'axios'
import { useAuth } from '../utils/useAuth'
import Button from './common/Button'
import { Pencil, Close } from './common/icons'
import Link from './common/Link'
import LinkForm from './LinkForm'

const ProfileLink = ({ id, title, link }) => {
  const { isAuth } = useAuth()
  const handleUpdateLink = async (data) => {
    const { data: res } = await axios.post('/api/link/update', {
      id,
      token: isAuth,
      link: data,
    })
    console.log(res)
  }
  const handleDeleteLink = async () => {
    const { data: res } = await axios.post('/api/link/update', {
      id,
      token: isAuth,
    })
    console.log(res)
  }
  return (
    <li>
      <div className="mb-2 flex w-full cursor-pointer items-center justify-between rounded-md border p-3 font-medium shadow-sm hover:shadow-md">
        <Link className={'w-full bg-fuchsia-400'} href={link}>
          {title}
        </Link>
        <LinkForm
          defaultValues={{ title, link }}
          onFormSubmit={handleUpdateLink}
          title={'Edit Link'}
        >
          <Pencil width={16} height={16} />
        </LinkForm>
        <Button onClick={handleDeleteLink} variant="text">
          <Close width={16} height={16} />
        </Button>
      </div>
    </li>
  )
}

export default ProfileLink
