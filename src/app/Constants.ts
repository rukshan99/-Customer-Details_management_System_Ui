export class Constants {

    public static SERVER_URL: string = "http://localhost:8080/";

    public static USERS_RESOURCE: string = Constants.SERVER_URL + "api/users/";

    public static FIND_ALL_USERS: string = Constants.USERS_RESOURCE;

    public static ADD_NEW_USER: string = Constants.USERS_RESOURCE + "add";

    public static UPDATE_USER: string = Constants.USERS_RESOURCE + "update";

    public static DELETE_USER: string = Constants.USERS_RESOURCE + "delete/"; // + id

    public static FIND_BY_ID: string = Constants.USERS_RESOURCE; // + id

    public static FIND_BY_CRITERIA: string = Constants.USERS_RESOURCE + "search?criteria="; //+ criteria +"&searchItem=" + searchItem;

    public static INTERNAL_SERVER_ERROR_MESSAGE: string = "Error in communicating with server.";

    public static MANDATORY_FIELDS_ERROR_MESSSAGE = "All fields are required.";

    public static NOT_A_NUMBER_ERROR_MESSAGE = "Not a number.";
}