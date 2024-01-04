FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /app

COPY TrackingService/ ./TrackingService/
COPY TrackingService.Domain/ ./TrackingService.Domain/
COPY TrackingService.Repositories/ ./TrackingService.Repositories/
COPY TrackingService.Services/ ./TrackingService.Services/

WORKDIR /app/TrackingService

# Ejecutar dotnet restore para restaurar las dependencias.
RUN dotnet restore ./TrackingService.sln

# Publicar la API
RUN dotnet publish ./TrackingService.sln -c Release -o out

# Generar la imagen de runtime con la imagen de ASP.NET Core
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build-env /app/TrackingService/out .
ENTRYPOINT ["dotnet", "TrackingServiceAPI.dll"]