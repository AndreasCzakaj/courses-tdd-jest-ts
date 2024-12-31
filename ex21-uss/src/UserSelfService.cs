using System;
using System.Net.Http;
using System.Threading.Tasks;
using MongoDB.Driver;

public class SignUpService
{
    public async Task<bool> SignUp(string username, string password)
    {
        // in Unterfunktionen aufteilen
        // Strukturen zusammenfassen
        if (!string.IsNullOrWhiteSpace(username) && username.Trim().Length > 8)
        {
            if (username.Trim().Length < 12)
            {
                if (!string.IsNullOrWhiteSpace(password) && password.Trim().Length > 12)
                {
                    if (password.Trim().Length < 16)
                    {
                        var mongoClient = new MongoClient(Environment.GetEnvironmentVariable("MONGO_URI") ?? "not_set");
                        try
                        {
                            var database = mongoClient.GetDatabase("default");
                            var collection = database.GetCollection<dynamic>("users");

                            try
                            {
                                var existingUser = await collection.Find(Builders<dynamic>.Filter.Eq("username", username)).FirstOrDefaultAsync();

                                if (existingUser == null)
                                {
                                    HttpResponseMessage resp = null;
                                    try
                                    {
                                        var url = $"{Environment.GetEnvironmentVariable("ODATA_BASE_URL")}/People/{username}";
                                        using var httpClient = new HttpClient();
                                        resp = await httpClient.GetAsync(url);

                                        var status = (int)resp.StatusCode;
                                        var statusText = resp.ReasonPhrase;
                                        if (status == 200)
                                        {
                                            var remoteUserData = await resp.Content.ReadAsAsync<dynamic>();

                                            await collection.InsertOneAsync(new
                                            {
                                                username,
                                                password, // <- ToDo: hash this
                                                status = "new",
                                                firstName = remoteUserData.FirstName,
                                                lastName = remoteUserData.LastName,
                                                emails = remoteUserData.Emails
                                            });

                                            // email service: send mail to verify mail address, then update the DB

                                            return true;
                                        }
                                        else if (status == 404)
                                        {
                                            Console.WriteLine("not found");
                                        }
                                    }
                                    catch (Exception nodeFetchError)
                                    {
                                        Console.WriteLine("nodeFetchError: " + nodeFetchError.Message);
                                    }
                                }
                                else
                                {
                                    Console.WriteLine("user already exists");
                                }
                            }
                            catch (Exception sqlError)
                            {
                                // Silent catch
                            }
                        }
                        catch (Exception connectionError)
                        {
                            Console.WriteLine("connectionError: " + connectionError.Message);
                        }
                    }
                }
            }
        }

        return false;
    }
}
