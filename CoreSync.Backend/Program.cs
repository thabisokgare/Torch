var builder = WebApplication.CreateBuilder(args);

// Explicitly define URLs
builder.WebHost.UseUrls("http://localhost:5000", "https://localhost:5001");

// Add services
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Enable CORS for Next.js frontend
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:3000") // Allow frontend requests
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                      });
});

// Register WeatherService
builder.Services.AddScoped<IWeatherService, WeatherService>();

var app = builder.Build();

// Configure middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(MyAllowSpecificOrigins);
app.UseHttpsRedirection(); // Ensure HTTPS redirection works

// API Route
app.MapGet("/weatherforecast", (IWeatherService weatherService) =>
{
    return weatherService.GetWeatherForecast();
})
.WithName("GetWeatherForecast");

app.Run();
