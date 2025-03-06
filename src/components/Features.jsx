import '../assets/styles/feature.css';

export default function Features() {
    const features = [
      {
        title: "Stay Informed",
        description: "Access easy-to-understand summaries and AI-driven explanations of key government documents."
      },
      {
        title: "Report Issues",
        description: "Report incidents with photos and videos to ensure your concerns are addressed promptly."
      },
      {
        title: "Poll Participation",
        description: "Participate in polls to voice your opinions and contribute to informed decision-making."
      },
    ];

    const featuresList = [
      {
        img: "https://civicsforlife.org/wp-content/uploads/2023/05/AdobeStock_593648417-scaled.jpeg",
        title: "Citizen Education",
        description: "Access easy-to-understand summaries and AI-driven explanations of key government documents"
      },
      {
        img: "https://ehs.utoronto.ca/wp-content/uploads/2023/04/incident_report_photo.jpg",
        title: "Incident Reporting",
        description: "Report incidents with photos and videos to ensure your concerns are addressed promptly"
      },
      {
        img: "https://media.licdn.com/dms/image/v2/C5112AQHFqM2ZTv2AQQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1541158903101?e=1746662400&v=beta&t=83Wh11oAisVH9OV6K2kvRxptrjT78Ef8kYhjPplmysI",
        title: "Government Interaction",
        description: "Government officials can monitor incidents, analyze feedback, and prioritize critical areas using AI"
      },
      {
        img: "https://www.plektonlabs.com/wp-content/uploads/2021/05/Integration-and-Artificial-Intelligence_-How-Do-They-Go-Hand-in-Hand_-768x473.jpg",
        title: "AI Integration",
        description: "Leverage AI to summarize citizen views and identify priority areas during emergencies"
      },
      {
        img: "https://mtc.ca.gov/sites/default/files/styles/whole_xl/public/images/2021-06/DSC_0005.jpg.webp?itok=FigGJ061",
        title: "Public Participation",
        description: "Participate in polls to voice your opinions and contribute to informed decision-making"
      },
    ];
  
    return (
      <section className="py-16 px-4 ">
        <div className="feature">
          {features.map((feature, index) => (
            <div key={index} className="p-6 rounded-lg shadow-md text-center s-f">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h2 className="title text-xl font-bold mb-2">{feature.title}</h2>
              <p className="desc">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="row g-4" id='feature-list'>
          {featuresList.map((feature, index) => (
            <div key={index} className="col-md-4 s-feature-list">
              <div id="feature-card" className="card h-100 text-center">
                <img
                  src={feature.img}
                  alt={feature.title}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h2 className="card-title fw-bold mb-3">{feature.title}</h2>
                  <p className="card-text">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
    </section>
  );
}