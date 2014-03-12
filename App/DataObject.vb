Public Class Wove
    Public Property Name As String = String.Empty
    Public Property Day As String = String.Empty
    Public Property Color As String = String.Empty
    Public Property Content As String = String.Empty
    Public Property Href As String = String.Empty
    Public Property ShowDefault As Boolean = False
    Public Property NameDetail As String = String.Empty
    Public Property DayDetail As String = String.Empty
    Public Property ContentDetail As String = String.Empty
End Class


Public Class ActivePic
    Public Property Name As String = String.Empty
    Public Property Description As String = String.Empty
    Public Property UrlAlbumCover As String = String.Empty
    Public Property UrlAlbum As String = String.Empty
End Class

Public Class Employee
    Public Property Name As String = String.Empty
    Public Property Title As String = String.Empty
    Public Property Src As String = String.Empty
    Public Property Href As String = String.Empty
    Public Property Message As String = String.Empty
    Public Property Specialty As String = String.Empty
    Public Property SpecialtyList As List(Of String) = New List(Of String)
End Class

Public Class AD
    Public Property Src As String = String.Empty
    Public Property Alt As String = String.Empty
End Class

Public Class Facebook
    Public Property href As String = String.Empty
End Class

Public Class Menu
    Public Property Hide As Boolean = False
    Public Property MenuText As String = String.Empty
    Public Property GroupText As String = String.Empty
    Public Property ItemText As String = String.Empty
    Public Property Href As String = String.Empty
    Public Property Anchor As String = String.Empty
    Public Property Extra As Boolean = False
End Class