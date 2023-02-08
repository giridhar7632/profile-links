import axios from 'axios'
import Button from './common/Button'
import { Pencil, Trash } from './common/icons'
import Link from './common/Link'
import LinkForm from './LinkForm'

const ProfileLink = ({ id, title, setLinks, own, token, link }) => {
  const handleUpdateLink = async (data) => {
    try {
      const res = await axios.post(
        '/api/link/update',
        { id, link: data },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setLinks((prev) => prev.map((i) => (i.id === id ? res.data.link : i)))
    } catch (error) {
      console.log(error)
    }
  }
  const handleDeleteLink = async () => {
    try {
      await axios.post(
        '/api/link/delete',
        { id },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
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
        {own && (
          <div className="flex items-center justify-between gap-1">
            <LinkForm
              defaultValues={{ title, link }}
              onFormSubmit={handleUpdateLink}
              title={'Edit Link'}
            >
              <Pencil width={16} height={16} />
            </LinkForm>
            <Button onClick={handleDeleteLink} variant="text">
              <Trash height={16} />
            </Button>
          </div>
        )}
      </div>
    </li>
  )
}

export default ProfileLink
