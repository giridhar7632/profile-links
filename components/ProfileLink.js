import axios from 'axios'
import Button from './common/Button'
import { Pencil, Close } from './common/icons'
import Link from './common/Link'
import LinkForm from './LinkForm'

const ProfileLink = ({ id, title, setLinks, isAuth, link }) => {
  const handleUpdateLink = async (data) => {
    try {
      await axios.post('/api/link/update', { id, token: isAuth, link: data })
      setLinks((prev) => prev.map((i) => (i.id === id ? { ...i, ...data } : i)))
    } catch (error) {
      console.log(error)
    }
  }
  const handleDeleteLink = async () => {
    try {
      await axios.post('/api/link/delete', { id, token: isAuth })
      setLinks((prev) => prev.filter((i) => i.id !== id))
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <li>
      <div className="mb-2 flex w-full cursor-pointer items-center justify-between rounded-md border p-3 font-medium shadow-sm hover:shadow-md">
        <Link
          className={'w-full'}
          target="_blank"
          rel="noreferrer noopener"
          href={link}
        >
          {title}
        </Link>
        {isAuth && (
          <div className="flex items-center justify-between gap-1">
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
        )}
      </div>
    </li>
  )
}

export default ProfileLink
