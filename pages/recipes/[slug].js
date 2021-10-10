import {
  sanityClient,
  usePreviewSubscription,
  urlFor,
  PortableText,
} from "../../lib/sanity";
import { useState } from "react";
import { useRouter } from "next/dist/client/router";

const recipeQuery = `*[_type=="recipe" && slug.current == $slug][0]{
    _id,
    name,
    slug,
    mainImage,
    ingredient[]{
        unit,
        wholeNumber,
        fraction,
        ingredient -> {
            name
        }
    },
    instructions,
    likes
}`;

export default function SpecificRecipe({ data, preview }) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  console.log(data.recipe);
  //   const { data: recipe } = usePreviewSubscription(recipeQuery, {
  //     params: {
  //       slug: data.recipe?.slug.current,
  //       initialData: data,
  //       enabled: preview,
  //     },
  //   });
  const { recipe } = data;
  const [likes, setLikes] = useState(data.recipe.likes);

  const addLikes = async () => {
    console.log(recipe, "recipe._id");
    const res = await fetch("/api/handle-like", {
      method: "POST",
      body: JSON.stringify({ _id: recipe._id }),
    }).catch((err) => {
      console.log("error", err);
    });

    const data = await res.json();
    setLikes(data.likes);
  };
  console.log(recipe);
  return (
    <article className="recipe">
      <h1>{recipe.name}</h1>
      <button className="like-button" onClick={addLikes}>
        {likes}
      </button>

      <main className="content">
        <img src={urlFor(recipe.mainImage).url()} alt={recipe.name} />
        <div className="breakdown">
          <ul className="ingredients">
            {recipe.ingredient.map((ingredient) => (
              <li key={ingredient} className="ingredient">
                {ingredient?.wholeNumber}
                {ingredient?.fraction} {ingredient?.unit}
                <br />
                {ingredient?.ingredient?.name}
              </li>
            ))}
          </ul>
          <PortableText
            blocks={recipe?.instructions}
            className="instructions"
          />
        </div>
      </main>
    </article>
  );
}

export async function getStaticPaths() {
  const paths =
    await sanityClient.fetch(`*[_type=="recipe" && defined(slug.current)]{
        "params":{
            "slug":slug.current
        }
    }`);
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const recipe = await sanityClient.fetch(recipeQuery, { slug });
  return { props: { data: { recipe }, preview: true } };
}
