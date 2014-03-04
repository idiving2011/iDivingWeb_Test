Imports System.Web

Public Class ProcActivePic
    Inherits Proc

    Public Overloads Shared Function GetInstance(strTableName As String, strFileName As String, strId As String) As Proc
        m_Instance = New ProcActivePic(strTableName, strFileName, strId)
        Return m_Instance
    End Function

    Protected Sub New(strTableName As String, strFileName As String, strId As String)
        MyBase.New(strTableName, strFileName, strId)
    End Sub

    Protected Overrides Function ReadDatatableToList(dt As DataTable) As Object
        Dim listActivePic As New List(Of ActivePic)()

        For Each aRow As DataRow In dt.Rows
            If String.IsNullOrWhiteSpace(GetString(aRow.Item(0))) Then
                Continue For
            End If
            Dim aActivePic As New ActivePic()
            aActivePic.Name = GetString(aRow.Item(0))
            aActivePic.Day = GetString(aRow.Item(1))
            aActivePic.UrlAlbumCover = HttpUtility.HtmlDecode(GetString(aRow.Item(2)))
            aActivePic.UrlAlbum = HttpUtility.HtmlDecode(GetString(aRow.Item(3)))
            listActivePic.Add(aActivePic)
        Next

        Return listActivePic
    End Function

    Protected Overrides Function CreateDefaultXml(aList As Object) As XElement
        Dim ActivePicList As List(Of ActivePic) = CType(aList, List(Of ActivePic))
        Dim xBlockEle As New XElement("Block")
        xBlockEle.SetAttributeValue("id", m_StrId)
        xBlockEle.SetAttributeValue("caption", m_StrTableName)
        xBlockEle.SetAttributeValue("method", "scroll")
        xBlockEle.SetAttributeValue("href", m_StrPhpFileName)
        xBlockEle.SetAttributeValue("target", "_blank")
        xBlockEle.SetAttributeValue("overflow", "scroll")

        For Each item As ActivePic In ActivePicList
            Dim xItem As New XElement("Item")
            xItem.SetAttributeValue("name", item.Name)
            xItem.SetAttributeValue("date", item.Day)
            xItem.SetAttributeValue("src", item.UrlAlbumCover)
            xItem.SetAttributeValue("href", item.UrlAlbum)
            xBlockEle.Add(xItem)
        Next
        Return xBlockEle
    End Function

    Protected Overrides Function CreatePageXml(aList As Object) As XElement
        Dim ActivePicList As List(Of ActivePic) = CType(aList, List(Of ActivePic))
        Dim xBlockEle As New XElement("Block")
        xBlockEle.SetAttributeValue("id", m_StrId)
        xBlockEle.SetAttributeValue("method", "screen")

        For Each item As ActivePic In ActivePicList
            Dim xItem As New XElement("Item")
            xItem.SetAttributeValue("name", item.Name)
            xItem.SetAttributeValue("date", item.Day)
            xItem.SetAttributeValue("src", item.UrlAlbumCover)
            xItem.SetAttributeValue("href", item.UrlAlbum)
            xBlockEle.Add(xItem)
        Next
        Return xBlockEle
    End Function

End Class

