import Link from './common/Link'
import EditLink from './EditLink'

const ProfileLink = ({ title, link }) => {
  return (
    <li>
      <div className="mb-2 flex w-full cursor-pointer items-center justify-between rounded-md border p-3 font-medium shadow-sm hover:shadow-md">
        <Link className={'w-full bg-fuchsia-400'} href={link}>
          {title}
        </Link>
        <EditLink title={title} link={link} />
      </div>
    </li>
  )
}

export default ProfileLink
