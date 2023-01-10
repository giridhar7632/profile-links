import Layout from '../components/layout'

const explore = () => {
  return (
    <Layout meta={{ name: 'Explore' }}>
      <div className="flex w-full flex-col items-center justify-center">
        <h1 className="text-clip text-3xl font-bold md:text-5xl">Explore</h1>
        <p className="text-md">
          Explore the profiles of many people all over the globe!
        </p>
      </div>
    </Layout>
  )
}

export default explore
