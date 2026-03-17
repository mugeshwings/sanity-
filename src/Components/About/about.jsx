import React, { useEffect, useState } from "react";
import { client, urlFor } from "../../sanity/SainityClient";

function About() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchData = async () => {

      try {

        const res = await client.fetch(`*[_type == "aboutSection"][0]{
          heroTitle,
          heroDescription,
          parasection,
          parasection2,

          ceoTitle,
          ceoPara1,
          ceoPara2,
          buttonText,
          popupTitle,
          popupPara,
          bannerImage,

          wingssectiontitle,
          wingspara,

          counters[]{
            title,
            number
          },

          cultureSection{
            cards[]{
              title,
              para,
              buttonText,
              buttonLink,
              image
            }
          }

        }`);

        console.log("SANITY DATA:", res);

        setData(res);

      } catch (error) {

        console.error("SANITY FETCH ERROR:", error);

      } finally {

        setLoading(false);

      }

    };

    fetchData();

  }, []);

  if (loading) return <div>Loading...</div>;

  if (!data) return <div>No data found in Sanity</div>;

  return (
    <div>

      {/* HERO SECTION */}

      <section>
        <h1>{data.heroTitle}</h1>
        <p>{data.heroDescription}</p>
      </section>


      {/* PARAGRAPH SECTION */}

      <section>
        <p>{data.parasection}</p>
        <p>{data.parasection2}</p>
      </section>


      {/* CEO SECTION */}

      <section>

        <h2>{data.ceoTitle}</h2>

        <p>{data.ceoPara1}</p>
        <p>{data.ceoPara2}</p>

        <button>{data.buttonText}</button>

        {data.bannerImage && (
          <img
            src={urlFor(data.bannerImage).width(1200).url()}
            alt="CEO Banner"
          />
        )}

      </section>


      {/* WINGS SECTION */}

      <section>

        <h2>{data.wingssectiontitle}</h2>
        <p>{data.wingspara}</p>

      </section>


      {/* CULTURE CARDS */}

      <section>

        {data.cultureSection?.cards?.map((card, index) => (

          <div key={index}>

            {card.image && (
              <img
                src={urlFor(card.image).width(800).url()}
                alt={card.title}
              />
            )}

            <h3>{card.title}</h3>

            <p>{card.para}</p>

            {card.buttonLink && (
              <a href={card.buttonLink}>
                {card.buttonText}
              </a>
            )}

          </div>

        ))}

      </section>


      {/* COUNTER SECTION */}

      <section>

        {data.counters?.map((counter, index) => (

          <div key={index}>

            <h2>{counter.number}</h2>
            <p>{counter.title}</p>

          </div>

        ))}

      </section>

    </div>
  );

}

export default About;