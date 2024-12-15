using BE.Domain.Entities;
using FireSharp.Config;
using FireSharp.Interfaces;
using Google.Cloud.Firestore;
using Google.Apis.Auth.OAuth2;
using Grpc.Auth;
using Google.Cloud.Firestore.V1;
using System.Data.SqlTypes;

namespace BE.Infrastructure.Firebase
{
    public class FireBaseService : IFireBaseService
    {
        IFirebaseConfig config = new FirebaseConfig
        {
            AuthSecret = "qe3MTNbKJkuPRyJMCB7adruK8QUT9eplAFx9L8fG",
            BasePath = "https://fir-connecting-2ffd6-default-rtdb.firebaseio.com/"
        };

        IFirebaseClient _client;

        public FireBaseService()
        {
            _client = new FireSharp.FirebaseClient(config);
        }

        public async Task AddUser(User user)
        {
            string rootPath = Directory.GetCurrentDirectory();

            rootPath = rootPath.Substring(0, rootPath.Length - 6);

            string jsonPath = Path.Combine(rootPath, "BE.Infrastructure", "Firebase", "service-account.json");
            if (!File.Exists(jsonPath))
            {
                throw new FileNotFoundException($"File service-account.json không tồn tại: {jsonPath}");
            }
            Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", jsonPath);

            //string jsonPath = "service-account.json";

            // Thiết lập biến môi trường GOOGLE_APPLICATION_CREDENTIALS
            // Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", @"D:\Luc_ASP.NET\SEP490\clone_2\SEP490_G23\BE\src\api\codes\BE.Infrastructure\Firebase\service-account.json");


            // Kết nối tới Firestore
            FirestoreDb firestoreDb = FirestoreDb.Create("erms-8b138");

            Console.WriteLine("Kết nối Firestore thành công!");

            //CollectionReference collection = firestoreDb.Collection("");

            //DocumentReference docRef = collection.Document(new Guid().ToString());


            var data = new
            {
                userId = user.Id.ToString(),
                displayname = user.UserName,
                image = user.AvatarPersonal
            };

            var newDocRef = await firestoreDb.Collection("users").AddAsync(data);

            Console.WriteLine("Dữ liệu đã được thêm vào Firestore!");
        }      
    }
}
