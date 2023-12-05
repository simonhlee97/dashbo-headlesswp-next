async function getData() {
  const res = await fetch('http://tennisboat.local/wp-json/wp/v2/posts/');
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function Page() {
  const data = await getData();
  // console.log(data);

  return (
    <>
      <h1 className="leadi text-4xl font-bold md:text-5xl">
        WP REST API Posts
      </h1>

      {data && (
        <div className="wp-posts">
          {data.map((post) => (
            <article key={post.id} className="w-128 m-4">
              <div className="max-w-lg bg-gray-900 p-4 text-gray-100 shadow-md">
                <div className="border-bottom flex justify-between pb-4">
                  <div className="flex items-center">
                    <a
                      rel="noopener noreferrer"
                      href="#"
                      className="mb-0 capitalize text-gray-100"
                    >
                      Photography
                    </a>
                  </div>
                  <a rel="noopener noreferrer" href="#">
                    See All
                  </a>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p>thumbnail img</p>
                    <div className="flex items-center text-xs">
                      <span>6 min ago</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <a rel="noopener noreferrer" href="#" className="block">
                      <h3 className="text-xl font-semibold text-sky-400">
                        {post.title.rendered}
                      </h3>
                    </a>
                    <p
                      className="leadi text-gray-400"
                      dangerouslySetInnerHTML={{
                        __html: post.content.rendered,
                      }}
                    />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
